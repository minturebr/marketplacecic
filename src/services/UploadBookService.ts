import { Request, Response } from 'express'

import { InsertBookService } from './'

class UploadBookService {
  public async store (req: Request, res: Response): Promise<Response> {
    return await InsertBookService.store(req, res)
  }
}

export default new UploadBookService()
