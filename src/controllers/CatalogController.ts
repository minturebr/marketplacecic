import { Request, Response } from 'express'

import UploadCatalogService from '../services/UploadCatalogService'

class CatalogController {
  public async store (req: Request, res: Response): Promise<Response> {
    return UploadCatalogService.store(req, res)
  }
}

export default new CatalogController()
