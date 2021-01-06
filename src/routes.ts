import { Router } from 'express'

import SellerController from './controllers/SellerController'

const routes = Router()

routes.get('/sellers', SellerController.index)
routes.post('/sellers', SellerController.store)

export default routes
