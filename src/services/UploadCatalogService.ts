import { Request, Response } from 'express'
import path from 'path'
import csv from 'csvtojson'

import Catalog from '../schemas/Catalog'

class UploadCatalogService {
  public async store (req: Request, res: Response): Promise<Response> {
    const csvFilePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'catalogs', req.file.filename)
    await csv().fromFile(csvFilePath).then((jsonObject) => {
      for (const x of jsonObject) {
        Object.assign(x, { sellerId: req.query.sellerId })
      }
      Catalog.create(jsonObject)
    })

    return res.json(req.file)
  }
}

export default new UploadCatalogService()
