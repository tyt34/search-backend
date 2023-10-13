import { client } from '..'
import { opensearchConf, sizeOnePage } from '../constants'
import { getFrom, transformData } from '../utils'

export const allDocuments = async (req, res) => {
  console.log({ qAll: req.query })
  const pageNumber = Number(req.query.page)

  const query = {
    query: {
      match_all: {}
    },
    size: sizeOnePage,
    from: getFrom(pageNumber)
  }

  const opensearchResponse = await client.search({
    index: opensearchConf.index,
    body: query
  })

  const { body, statusCode } = opensearchResponse
  const result = transformData(body.hits.hits)

  res.status(statusCode).send({ data: result })
}
