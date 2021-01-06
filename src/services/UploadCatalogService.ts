import { Request, Response } from 'express'

class UploadCatalogService {
  public async store (req: Request, res: Response): Promise<Response> {
    return res.send(req.file)
  }
}

export default new UploadCatalogService()
