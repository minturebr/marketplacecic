import { Router } from 'express'
import multer from 'multer'
import { multerConfigCatalog } from './config/multer'

import SellerController from './controllers/SellerController'
import CatalogController from './controllers/CatalogController'

const routes = Router()

routes.get('/sellers', SellerController.index)
routes.post('/sellers', SellerController.store)
routes.post('/catalog', multer(multerConfigCatalog).single('file'), CatalogController.store)

export default routes
