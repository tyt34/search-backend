import { search } from '../controllers'
import { router } from '../utils'

export const searchRoute = router.get('/search', search)
