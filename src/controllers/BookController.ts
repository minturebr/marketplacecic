import { Request, Response } from 'express'
import { GetBooksService, UploadBookService } from '../services'

class BookController {
  public async store (req: Request, res: Response): Promise<Response> {
    return UploadBookService.store(req, res)
  }

  public async index (req: Request, res: Response): Promise<Response|void> {
    if (req.query.download) {
      return GetBooksService.download(req, res)
    }

    if (req.query.publisher || req.query.date || req.query.price) {
      return GetBooksService.index(req, res)
    }

    return GetBooksService.bestPrice(res)
  }
}

export default new BookController()
