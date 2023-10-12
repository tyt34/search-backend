import util = require('util')
import { client } from '..'
import { transformDataFilter } from '../utils'

// const query = {
//   query: {
//     range: {
//       postId: {
//         gte: 2,
//         lte: 3
//       }
//     }
//   }
// }

// const query = {
//   query: {
//     bool: {
//       must: [
//         {
//           match_phrase: {
//             body: 'unde sed'
//           }
//         },
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

// const query = {
//   query: {
//     bool: {
//       must: [
//         {
//           match_phrase: {
//             body: 'et'
//           }
//         },
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
//               lte: 8
//             }
//           }
//         }
//       ]
//     }
//   }
// }

const query = {
  query: {
    bool: {
      must: [
        {
          range: {
            postId: {
              gte: 2,
              lte: 3
            }
          }
        },
        {
          range: {
            id: {
              gte: 5,
              lte: 10
            }
          }
        }
      ]
    }
  }
}

type QueryObjType = {
  range: Record<'postId' | 'id', { gte: number; lte: number }>
}

type ConfFilter = {
  type: string[]
  from: number[]
  to: number[]
}

const createQuery = (conf: ConfFilter) => {
  // console.log({ conf })
  const arrQueryObj: QueryObjType[] = conf.type.reduce((acc, el, i) => {
    // console.log({ acc, el, i })
    return [
      ...acc,
      {
        range: {
          [el]: {
            gte: conf.from[i],
            lte: conf.to[i]
          }
        }
      }
    ]
  }, [])

  // console.log({ R: util.inspect(arrQueryObj, false, null) })

  return {
    query: {
      bool: {
        must: [...arrQueryObj]
      }
    }
  }
}

const arrStrToArrNum = (arr: string[]): number[] => {
  return arr.map((el: string) => Number(el))
}

const arrFilter = (arr: string[]) => {
  return arr.filter((el) => !!el)
}

const createConf = (query): ConfFilter => {
  console.log({ query })
  const arrType = arrFilter(query.type)
  const arrFromStr = arrFilter(query.from)
  const arrFromNum = arrStrToArrNum(arrFromStr)
  const arrToStr = arrFilter(query.from)
  const arrToNum = arrStrToArrNum(arrToStr)
  // console.log({ arrType, arrFromNum, arrToNum })
  return {
    type: arrType,
    from: arrFromNum,
    to: arrToNum
  }
  // const isArray = Array.isArray(query.type)
  // console.log({ isArray })
  // if (isArray) {
  //   return {
  //     type: [...query.type],
  //     from: [...arrStrToArrNum(query.from)],
  //     to: [...arrStrToArrNum(query.to)]
  //   }
  // } else {
  //   return {
  //     type: [query.type],
  //     from: [Number(query.from)],
  //     to: [Number(query.to)]
  //   }
  // }
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

  const result = transformDataFilter(body.hits.hits)

  res.status(statusCode).send({ data: result })
}
