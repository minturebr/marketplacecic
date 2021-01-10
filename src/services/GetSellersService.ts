import { Response } from 'express'

import { Seller } from '../schemas'

class GetSellerService {
  public async index (res: Response): Promise<Response> {
    const sellers = await Seller.find()
    return res.json(sellers)
  }
}

export default new GetSellerService()
