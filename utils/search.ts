import { templateShould } from './../constants/search'
import { sizeOnePage } from '../constants'
import { SearchConf } from '../types'
import { getFrom } from './utils'

export const createQueryMultiMatch = (conf: SearchConf) => {
  // console.log({ conf })
  const text = conf.text
  const arrFields = conf.fields
  // console.log({ arrFields })
  return {
    query: {
      multi_match: {
        query: text,
        fields: arrFields
      }
    },
    size: sizeOnePage,
    from: getFrom(conf.page)
  }
}

// export const createQueryQueryString = (confg: SearchConf) => {
//   const arrShould = confg.fields.reduce((acc, el, i) => {
//     const should = {
//       query_string: { ...templateShould }
//     }
//     should.query_string.query = confg.text
//     should.query_string.default_field = el
//     return [...acc, { ...should }]
//   }, [])

//   const query = {
//     query: {
//       bool: {
//         should: arrShould
//       }
//     },
//     size: sizeOnePage,
//     from: getFrom(confg.page)
//   }

//   return query
// }

export const createQueryMatchPhrase = (confg: SearchConf) => {
  const arrShould = confg.fields.reduce((acc, el, i) => {
    const should = {
      match_phrase: {
        [el]: confg.text
      }
    }
    return [...acc, should]
  }, [])

  const query = {
    query: {
      bool: {
        should: arrShould
      }
    },
    size: sizeOnePage,
    from: getFrom(confg.page)
  }

  return query
}
