import { Response } from 'express'

import Seller from '../schemas/Seller'

class GetSellerService {
  public async get (res: Response): Promise<Response> {
    const sellers = await Seller.find()
    return res.json(sellers)
  }
}

export default new GetSellerService()
