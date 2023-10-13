import { filterSearch } from '../controllers'
import { router } from '../utils'

export const searchFilterRoute = router.get(
  '/filter_search',
  filterSearch
)
