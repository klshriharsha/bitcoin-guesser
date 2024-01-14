import express from 'express'

import * as userController from '../controllers/user.controller'

export const router = express.Router()

router.get('/:username', userController.get)
router.post('/:username', userController.create)

router.post('/:username/make-guess', userController.guess)
