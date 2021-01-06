import { Request, Response } from 'express'

import Seller from '../schemas/Seller'

class SellerController {
  public async index (req: Request, res: Response): Promise<Response> {
    const users = await Seller.find()
    return res.json(users)
  }

  public async store (req: Request, res: Response): Promise<Response> {
    const user = await Seller.create(req.body)

    return res.json(user)
  }
}

export default new SellerController()
