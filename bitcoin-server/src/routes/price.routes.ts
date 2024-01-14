import express from 'express'

import * as priceController from '../controllers/price.controller'

export const router = express.Router()

router.get('/', priceController.get)
