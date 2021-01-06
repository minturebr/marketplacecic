import { Request, Response } from 'express'

import Seller from '../schemas/Seller'

class InsertSellerService {
  public async store (req: Request, res: Response): Promise<Response> {
    const sellers = await Seller.create(req.body)
    return res.json(sellers)
  }
}

export default new InsertSellerService()
