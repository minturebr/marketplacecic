import { Response } from 'express'

import Book, { IBookInterface, IBookInterfaceResponse } from '../schemas/Book'
import Seller from '../schemas/Seller'

class GetBooksService {
  public async bestPrice (res: Response): Promise<Response> {
    const booksResponse: Array<IBookInterfaceResponse> = []
    const books: Array<IBookInterface> = await Book.find()
    const idBook: Array<String> = []

    const bestPricesBooks = new Map()
    for (const book of books) {
      const title = book.title

      if (bestPricesBooks.get(title) === undefined) {
        bestPricesBooks.set(title, { qty: 1, books: [book] })
      } else {
        const arrayBooks = bestPricesBooks.get(title).books
        arrayBooks.push(book)
        bestPricesBooks.set(title, { qty: bestPricesBooks.get(title).qty + 1, books: arrayBooks })
        const minPrice = Math.min(...bestPricesBooks.get(title).books.map(b => b.price))

        bestPricesBooks.get(title).books.filter((x) => {
          if (x.price === minPrice) { idBook.push(x._id) }
          return idBook
        })
      }
    }

    for (const x of books) {
      const seller = await Seller.find({ _id: x.sellerId })

      const book: IBookInterfaceResponse = {
        title: x.title,
        authors: x.authors,
        numPages: x.numPages,
        publicationDate: x.publicationDate,
        publisher: x.publisher,
        price: x.price,
        seller: {
          name: seller[0].name,
          email: seller[0].email
        }
      }

      if (idBook.includes(x._id)) {
        Object.assign(book, { bestPrice: true })
      }

      booksResponse.push(book)
    }

    return res.json(booksResponse)
  }
}

export default new GetBooksService()
