import { Request, Response } from 'express'
import UploadBookService from '../services/UploadBookService'

class BookController {
  public async store (req: Request, res: Response): Promise<Response> {
    return UploadBookService.store(req, res)
  }
}

export default new BookController()
