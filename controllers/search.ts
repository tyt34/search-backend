import { client } from '..'
import { opensearchConf } from '../constants'
import {
  arrFilter,
  getReqResult,
  methodsSearch,
  splitText
} from '../utils'

export const search = async (req, res) => {
  console.log({ qSearch: req.query })

  try {
    const pageNumber = Number(req.query.page)
    const typeSearch = req.query.search_type
    const arrField = arrFilter(req.query.field)
    const textSearch = splitText(req.query.text)

    const conf = {
      text: textSearch,
      fields: arrField,
      page: pageNumber
    }

    const query = methodsSearch[typeSearch](conf)

    const opensearchResponse = await client.search({
      index: opensearchConf.index,
      body: query
    })

    const { body, statusCode } = opensearchResponse
    const resultReq = getReqResult(body)
    res.status(statusCode).send(resultReq)
  } catch (error) {
    res.status(400).send({ data: [], total: 0 })
  }
}
