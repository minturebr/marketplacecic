import { Request, Response } from 'express'
import Mongoose from 'mongoose'
import path from 'path'
import pdf from 'pdf-parse'
import fs from 'fs'

import Book, { IBookInterface } from '../schemas/Book'
import Catalog, { CatalogInterface } from '../schemas/Catalog'

class InsertBookService {
  private async filters (req: Request) {
  // Load file
    const dataBuffer = fs.readFileSync(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'books', req.file.filename))

    // PDF Parse
    const pdfData = await pdf(dataBuffer)
    const pdfDataInfoTitle = pdfData.info.Title.split([' '])
    const pdfDataMetadaDateModified = (pdfData.metadata._metadata['xmp:modifydate']) ? pdfData.metadata._metadata['xmp:modifydate']?.split(['-'])[0] : pdfData.metadata._metadata['xap:modifydate']?.split(['-'])[0]
    const pdfDataInfoAuthor = pdfData.info.Author.split([' '])

    // Title
    const title: Array<CatalogInterface> = await Catalog.find({ $and: [{ title: new RegExp(pdfDataInfoTitle[0]) }, { title: new RegExp(pdfDataInfoTitle.pop()) }] }).find({ sellerId: req.query.sellerId })

    // numPages
    const numPages: Array<CatalogInterface> = await Catalog.find({ $or: [{ numPages: pdfData.numrender }, { numPages: pdfData.numpages }] }).find({ sellerId: req.query.sellerId })

    // PublicationDate
    const publicationDate: Array<CatalogInterface> = await Catalog.find({ $or: [{ publicationDate: pdfDataMetadaDateModified }, { numPages: parseInt(pdfDataMetadaDateModified) + 1 }] }).find({ sellerId: req.query.sellerId })

    // Publisher
    const publisher: Array<CatalogInterface> = await Catalog.find({ $or: [{ publisher: pdfDataInfoAuthor[0] }, { publisher: pdfDataInfoAuthor.pop() }] }).find({ sellerId: req.query.sellerId })

    const mapBook = new Map()
    const booksFound = title.concat(numPages, publicationDate, publisher)

    booksFound.forEach(x => {
      const id = x._id.toString()
      if (mapBook.get(id) === undefined) {
        mapBook.set(id, 1)
      } else {
        mapBook.set(id, mapBook.get(id) + 1)
      }
    })

    console.log(mapBook)

    function getKey (val) {
      return [...mapBook].find(([key, value]) => val === value)[0]
    }
    const catalogs: Array<CatalogInterface> = await Catalog.find({ _id: getKey(Math.max(...mapBook.values())) })

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

  public async store (req: Request, res: Response): Promise<Response> {
    const catalog = await this.filters(req)

    if (catalog === false) {
      res.sendStatus(404)
    }

    const obj: IBookInterface = {
      title: req.file.originalname,
      authors: catalog[0].authors,
      numPages: catalog[0].numPages,
      publicationDate: catalog[0].publicationDate,
      publisher: catalog[0].publisher,
      price: catalog[0].price,
      sellerId: new Mongoose.Types.ObjectId(`${req.query.sellerId}`),
      catalogId: new Mongoose.Types.ObjectId(`${catalog[0]._id}`)
    }

    return res.json(await Book.create(obj))
  }
}

export default new InsertBookService()
