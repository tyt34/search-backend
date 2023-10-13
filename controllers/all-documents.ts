import { client } from '..'
import { opensearchConf } from '../constants'
import { createPagination, getReqResult } from '../utils'

export const allDocuments = async (req, res) => {
  console.log({ qAll: req.query })
  const pageNumber = Number(req.query.page)
  const pagination = createPagination(pageNumber)

  const query = {
    query: {
      match_all: {}
    },
    ...pagination
  }

  const opensearchResponse = await client.search({
    index: opensearchConf.index,
    body: query
  })

  const { body, statusCode } = opensearchResponse
  const resultReq = getReqResult(body)

  res.status(statusCode).send(resultReq)
}
