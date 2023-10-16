import { client } from '..'
import { opensearchConf } from '../constants'
import {
  arrFilter,
  createConfFilter,
  getReqResult,
  methodsFilterSearch,
  splitText
} from '../utils'

export const filterSearch = async (req, res) => {
  console.log({ qFilterSearch: req.query })

  const pageNumber = Number(req.query.page)
  const typeSearch = req.query.search_type

  const arrField = arrFilter(req.query.field)
  const confFilter = createConfFilter(req.query)
  const textSearch = splitText(req.query.text)

  const confSearch = {
    text: textSearch,
    fields: arrField,
    page: pageNumber
  }

  const query = methodsFilterSearch[typeSearch](confFilter, confSearch)

  try {
    const opensearchResponse = await client.search({
      index: opensearchConf.index,
      body: query
    })

    const { body, statusCode } = opensearchResponse
    const resultReq = getReqResult(body)
    res.status(statusCode).send(resultReq)
  } catch (error) {
    res.status(400).send({ error })
  }
}
