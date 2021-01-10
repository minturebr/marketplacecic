import { Request, Response } from 'express'

import { Seller } from '../schemas'

class InsertSellerService {
  public async store (req: Request, res: Response): Promise<Response> {
    await Seller.create(req.body)
    return res.sendStatus(201)
  }
}

export default new InsertSellerService()
