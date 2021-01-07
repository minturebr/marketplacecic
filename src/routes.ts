import { Router } from 'express'
import multer from 'multer'
import { multerConfigCatalog, multerConfigBook } from './config/multer'

import SellerController from './controllers/SellerController'
import CatalogController from './controllers/CatalogController'
import BookController from './controllers/BookController'

const routes = Router()

routes.get('/sellers', SellerController.index)
routes.post('/sellers', SellerController.store)
routes.post('/catalog', multer(multerConfigCatalog).single('file'), CatalogController.store)
routes.post('/book', multer(multerConfigBook).single('file'), BookController.store)

export default routes
