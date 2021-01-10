import { Request } from 'express'
import pdf from 'pdf-parse'

import { Catalog, CatalogInterface } from '../schemas'

class FilterService {
  public async filter (req: Request, pdfData: pdf.Result): Promise<any> {
    let title: Array<CatalogInterface>
    let numPages: Array<CatalogInterface>
    let publicationDate: Array<CatalogInterface>
    let publisher: Array<CatalogInterface>
    const mapBook = new Map()
    let booksFound = []

    // Filters
    if (pdfData) {
      if (pdfData.metadata) {
        const pdfDataMetadaDateModified = (pdfData.metadata._metadata['xmp:modifydate']) ? pdfData.metadata._metadata['xmp:modifydate']?.split(['-'])[0] : pdfData.metadata._metadata['xap:modifydate']?.split(['-'])[0]
        publicationDate = await Catalog.find({ $or: [{ publicationDate: pdfDataMetadaDateModified }, { numPages: parseInt(pdfDataMetadaDateModified) + 1 }] }).find({ sellerId: req.query.sellerId })
      }

      if (pdfData.info.Title) {
        const pdfDataInfoTitle = pdfData.info.Title.split([' '])
        title = await Catalog.find({ $and: [{ title: new RegExp(pdfDataInfoTitle[0]) }, { title: new RegExp(pdfDataInfoTitle.pop()) }] }).find({ sellerId: req.query.sellerId })
      }

      if (pdfData.info.Author) {
        const pdfDataInfoAuthor = pdfData.info.Author.split([' '])
        publisher = await Catalog.find({ $or: [{ publisher: pdfDataInfoAuthor[0] }, { publisher: pdfDataInfoAuthor.pop() }] }).find({ sellerId: req.query.sellerId })
      }
      numPages = await Catalog.find({ $or: [{ numPages: pdfData.numrender }, { numPages: pdfData.numpages }] }).find({ sellerId: req.query.sellerId })
    }

    // Concat for pontuation

    if (title !== undefined) {
      booksFound = booksFound.concat(title)
    }

    if (numPages !== undefined) {
      booksFound = booksFound.concat(numPages)
    }

    if (publicationDate !== undefined) {
      booksFound = booksFound.concat(publicationDate)
    }

    if (publisher !== undefined) {
      booksFound = booksFound.concat(publisher)
    }

    booksFound = booksFound.filter((x) => {
      return x !== undefined
    })

    booksFound.forEach(x => {
      const id = x._id.toString()
      if (mapBook.get(id) === undefined) {
        mapBook.set(id, 1)
      } else {
        mapBook.set(id, mapBook.get(id) + 1)
      }
    })

    if (mapBook.size === 0) {
      return false
    }

    function getKey (val) {
      return [...mapBook].find(([key, value]) => val === value)[0]
    }

    const catalogs: Array<CatalogInterface> = await Catalog.find({ _id: getKey(Math.max(...mapBook.values())) })
    return catalogs
  }
}

export default new FilterService()
