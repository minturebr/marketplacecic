import { Router } from 'express'
import multer from 'multer'
import { multerConfigCatalog, multerConfigBook } from './config/multer'

import SellerController from './controllers/SellerController'
import CatalogController from './controllers/CatalogController'
import BookController from './controllers/BookController'

const routes = Router()

// GET Routes
routes.get('/sellers', SellerController.index)
routes.get('/books', BookController.index)

// POST routes
routes.post('/sellers', SellerController.store)
routes.post('/catalogs', multer(multerConfigCatalog).single('file'), CatalogController.store)
routes.post('/books', multer(multerConfigBook).single('file'), BookController.store)

export default routes
