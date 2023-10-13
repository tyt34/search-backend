import { allDocuments } from '../controllers'
import { router } from '../utils'

export const allDocumentsRoute = router.get('/all', allDocuments)
