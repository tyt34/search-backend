import { filter } from '../controllers'
import { router } from '../utils'

export const filterRoute = router.get('/filter', filter)
