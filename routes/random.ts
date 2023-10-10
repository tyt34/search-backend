import { createRandomNumber } from '../controllers'

const router = require('express').Router()

export const randomRoute = router.get('/random', createRandomNumber)
