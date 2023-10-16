import { client } from '..'
import { opensearchConf } from '../constants'
import {
  createConfFilter,
  createQueryFilter,
  getReqResult
} from '../utils'

export const filter = async (req, res) => {
  console.log({ qFilter: req.query })

  const conf = createConfFilter(req.query)
  const query = createQueryFilter(conf)

  // const opensearchResponse = await client.search({
  //   index: opensearchConf.index,
  //   body: query
  // })

  // const { body, statusCode } = opensearchResponse
  // const resultReq = getReqResult(body)

  // res.status(statusCode).send(resultReq)

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
