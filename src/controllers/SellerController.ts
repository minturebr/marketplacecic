import { Request, Response } from 'express'

import GetSellerService from '../services/getSellersService'
import InsertSellerService from '../services/InsertSellerService'

class SellerController {
  public async index (req: Request, res: Response): Promise<Response> {
    return GetSellerService.index(res)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    return InsertSellerService.store(req, res)
  }
}

export default new SellerController()
