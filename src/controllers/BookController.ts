import { Request, Response } from 'express'
import GetBooksService from '../services/GetBooksService'
import UploadBookService from '../services/UploadBookService'

class BookController {
  public async store (req: Request, res: Response): Promise<Response> {
    return UploadBookService.store(req, res)
  }

  public async index (req: Request, res: Response): Promise<Response> {
    // Filtros
    // Melhores preço para o mesmo livro [OK]

    // Nome da editora (publisher)
    // Ordenação por data de publicação
    // Ordenação de preço
    // Filtragem: Filtros por vendedor e nome do livro ?s
    return GetBooksService.bestPrice(res)
  }
}

export default new BookController()
