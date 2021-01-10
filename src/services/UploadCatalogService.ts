import { Request, Response } from 'express'
import path from 'path'
import pdf from 'pdf-parse'
import fs from 'fs'
import csv from 'csvtojson'
import Mongoose from 'mongoose'

import { Book, Catalog, CatalogInterface } from '../schemas'
import FilterService from './FilterService'

class UploadCatalogService {
  public async store (req: Request, res: Response): Promise<Response> {
    const csvFilePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'catalogs', req.file.filename)
    await csv().fromFile(csvFilePath).then((jsonObject) => {
      for (const x of jsonObject) {
        Object.assign(x, { sellerId: req.query.sellerId })
      }
      Catalog.create(jsonObject)
    })
    this.filters(req)
    return res.json(req.file)
  }

  private async filters (req: Request) {
    const books = await Book.find({ catalogId: null })

    for (const b of books) {
      //  Load file
      const dataBuffer = fs.readFileSync(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'books', b.path))

      //  PDF Parse
      const pdfData = await pdf(dataBuffer)

      // Filters
      const catalogs: Array<CatalogInterface> = await FilterService.filter(req, pdfData)

      const result = (catalogs: Array<CatalogInterface>) => {
        return {
          catalogId: new Mongoose.Types.ObjectId(`${catalogs[0]._id}`),
          title: catalogs[0].title,
          authors: catalogs[0].authors,
          numPages: catalogs[0].numPages,
          publicationDate: catalogs[0].publicationDate,
          publisher: catalogs[0].publisher,
          price: catalogs[0].price
        }
      }

      // Validate more than 1 book found in the catalog
      if (catalogs.length > 1) {
        // Author: for greater accuracy
        catalogs.forEach(async x => {
          const names = x.authors.split(' ')
          const check = pdfData.text.search(new RegExp(`(?=.*${names[0]})(?=.*${names.pop()})`, 'i'))
          if (check > -1) {
            // Update book with catalogId
            await Book.updateOne({ _id: b._id }, result(catalogs))
          }
        })
      }

      // Validate book that is not in the catalog
      if (catalogs.length === 0) {
        return false
      }

      // Update book with catalogId
      await Book.updateOne({ _id: b._id }, result(catalogs))
    }
  }
}

export default new UploadCatalogService()
