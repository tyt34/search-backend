import util = require('util')
import { client } from '..'
import {
  arrFilter,
  createQueryMatchPhrase,
  createQueryMultiMatch,
  splitText,
  transformData
} from '../utils'

export const search = async (req, res) => {
  console.log({ q: req.query })

  const typeSearch = req.query.search_type
  const arrField = arrFilter(req.query.field)
  const textSearch = splitText(req.query.text)
  const pageNumber = Number(req.query.page)

  const conf = {
    text: textSearch,
    fields: arrField,
    page: pageNumber
  }

  const methodsSearch = {
    multi_match: createQueryMultiMatch(conf),
    match_phrase: createQueryMatchPhrase(conf)
  }

  const query = methodsSearch[typeSearch]

  // const query = createQueryMultiMatch({
  //   text: textSearch,
  //   fields: arrField,
  //   page: pageNumber
  // })

  // const query = createQueryQueryString({
  //   text: textSearch,
  //   fields: arrField,
  //   page: pageNumber
  // })

  // const query = createQueryMatchPhrase({
  //   text: textSearch,
  //   fields: arrField,
  //   page: pageNumber
  // })

  // console.log({ query })

  // console.log({ a: util.inspect(query, false, null) })

  // const conf = createConf(req.query)

  // console.log({ CONF: conf })

  // const query = createQuery(conf)

  // const query = {
  //   query: {
  //     bool: {
  //       should: [
  //         { match_phrase: { body: 'deserunt quas accusantium' } },
  //         { match_phrase: { email: 'deserunt quas accusantium' } },
  //         { match_phrase: { name: 'deserunt quas accusantium' } }
  //       ]
  //     }
  //   },
  //   from: 0,
  //   size: 10
  // }

  const opensearchResponse = await client.search({
    index: 'd',
    body: query
  })

  const { body, statusCode } = opensearchResponse

  // console.log({ statusCode })

  const result = transformData(body.hits.hits)

  res.status(statusCode).send({ data: result })
}
