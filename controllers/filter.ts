import util = require('util')
import { client } from '..'
import {
  arrFilter,
  arrStrToArrNum,
  getFrom,
  transformData
} from '../utils'
import { sizeOnePage } from '../constants'
import { ConfFilter, QueryObjFilter } from '../types'

// const query = {
//   query: {
//     bool: {
//       must: [
//         {
//           range: {
//             postId: {
//               gte: 2,
//               lte: 3
//             }
//           }
//         },
//         {
//           range: {
//             id: {
//               gte: 5,
//               lte: 10
//             }
//           }
//         }
//       ]
//     }
//   }
// }

const createQuery = (conf: ConfFilter) => {
  const arrQueryObj: QueryObjFilter[] = conf.type.reduce(
    (acc, el, i) => {
      const from = conf.from[i]
      const to = conf.to[i]
      return [
        ...acc,
        {
          range: {
            [el]: {
              gte: from,
              lte: to
            }
          }
        }
      ]
    },
    []
  )

  return {
    query: {
      bool: {
        must: [...arrQueryObj]
      }
    },
    size: sizeOnePage,
    from: getFrom(conf.page)
  }
}

const createConf = (query): ConfFilter => {
  console.log({ query })
  const arrType = arrFilter(query.type)
  const arrFromStr = arrFilter(query.from)
  const arrFromNum = arrStrToArrNum(arrFromStr)
  const arrToStr = arrFilter(query.to)
  const arrToNum = arrStrToArrNum(arrToStr)

  return {
    type: arrType,
    from: arrFromNum,
    to: arrToNum,
    page: Number(query.page)
  }
}

export const filter = async (req, res) => {
  console.log({ q: req.query })

  const conf = createConf(req.query)

  console.log({ CONF: conf })

  const query = createQuery(conf)

  const opensearchResponse = await client.search({
    index: 'd',
    body: query
  })

  const { body, statusCode } = opensearchResponse

  console.log({ statusCode })

  const result = transformData(body.hits.hits)

  res.status(statusCode).send({ data: result })
}
