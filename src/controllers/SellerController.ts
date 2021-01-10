import { Request, Response } from 'express'

import { GetSellerService, InsertSellerService } from '../services'

class SellerController {
  public async index (req: Request, res: Response): Promise<Response> {
    return GetSellerService.index(res)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    return InsertSellerService.store(req, res)
  }
}

export default new SellerController()
