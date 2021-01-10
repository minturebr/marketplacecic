import { Request, Response } from 'express'
import Mongoose from 'mongoose'
import path from 'path'
import pdf from 'pdf-parse'
import fs from 'fs'

import { Book, IBookInterface, Catalog, CatalogInterface } from '../schemas'

import { FilterService } from './'

class InsertBookService {
  public async store (req: Request, res: Response): Promise<Response> {
    const catalog = await this.filters(req)
    const book: IBookInterface = {
      path: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'books', req.file.filename),
      sellerId: new Mongoose.Types.ObjectId(`${req.query.sellerId}`)
    }

    if (catalog === false) {
      return res.json(await Book.create(book))
    }

    const bookData = {
      title: catalog[0].title,
      authors: catalog[0].authors,
      numPages: catalog[0].numPages,
      publicationDate: catalog[0].publicationDate,
      publisher: catalog[0].publisher,
      price: catalog[0].price,
      catalogId: new Mongoose.Types.ObjectId(`${catalog[0]._id}`)
    }

    Object.assign(book, bookData)

    return res.json(await Book.create(book))
  }

  private async filters (req: Request) {
    // Load file
    const dataBuffer = fs.readFileSync(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'books', req.file.filename))

    // PDF Parse
    const pdfData = await pdf(dataBuffer)

    // Filters
    const catalogs: Array<CatalogInterface> = await FilterService.filter(req, pdfData)

    // Validate more than 1 book found in the catalog
    if (catalogs.length > 1) {
      // Author: for greater accuracy
      catalogs.forEach(x => {
        const names = x.authors.split(' ')
        const check = pdfData.text.search(new RegExp(`(?=.*${names[0]})(?=.*${names.pop()})`, 'i'))
        if (check > -1) {
          return Catalog.find({ _id: x._id })
        }
      })
    }

    // Validate book that is not in the catalog
    if (catalogs.length === 0) {
      return false
    }

    return catalogs
  }
}

export default new InsertBookService()
