import { searchRoute } from './../routes/search-route'
import util = require('util')
import { client } from '..'
import { transformDataFilter } from '../utils'

// multi_match - список этих слов
const query = {
  query: {
    multi_match: {
      query: 'delenit',
      fields: ['body', 'email', 'name']
    }
  },
  size: 10,
  from: 0
}

// query_string - что то похожие
// const query = {
//   query: {
//     bool: {
//       should: [
//         {
//           query_string: {
//             query: 'ocnaecati',
//             default_field: 'body',
//             type: 'best_fields',
//             fuzziness: 'AUTO',
//             fuzzy_transpositions: true,
//             fuzzy_max_expansions: 50
//           }
//         },
//         {
//           query_string: {
//             query: 'ocnaecati',
//             default_field: 'name',
//             type: 'best_fields',
//             fuzziness: 'AUTO',
//             fuzzy_transpositions: true,
//             fuzzy_max_expansions: 50
//           }
//         },
//         {
//           query_string: {
//             query: 'ocnaecati',
//             default_field: 'email',
//             type: 'best_fields',
//             fuzziness: 'AUTO',
//             fuzzy_transpositions: true,
//             fuzzy_max_expansions: 50
//           }
//         }
//       ]
//     }
//   },
//   from: 0,
//   size: 10
// }

// match_phrase - точное совпадение
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

export const search = async (req, res) => {
  console.log({ q: req.query })

  // const conf = createConf(req.query)

  // console.log({ CONF: conf })

  // const query = createQuery(conf)

  const opensearchResponse = await client.search({
    index: 'd',
    body: query
  })

  const { body, statusCode } = opensearchResponse

  // console.log({ statusCode })

  const result = transformDataFilter(body.hits.hits)

  res.status(statusCode).send({ data: result })
}
