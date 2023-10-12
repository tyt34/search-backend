import { createRandomNumber } from '../controllers'
import { router } from '../utils'

export const randomRoute = router.get('/random', createRandomNumber)
