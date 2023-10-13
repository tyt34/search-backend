import { SearchConf } from '../types'
import { createPagination } from './utils'

export const createObjMultiMatch = (text: string, arr: string[]) => {
  return {
    multi_match: {
      query: text,
      fields: arr
    }
  }
}

export const createQueryMultiMatch = (conf: SearchConf) => {
  console.log(' Start MultiMatch')
  const pageNumber = Number(conf.page)
  const text = conf.text
  const arrFields = conf.fields
  const objMultiMatch = createObjMultiMatch(text, arrFields)
  const pagination = createPagination(pageNumber)

  const resultQuery = {
    query: {
      ...objMultiMatch
    },
    ...pagination
  }

  return resultQuery
}

export const createArrMatchPhrase = (conf: SearchConf) => {
  const arrShould = conf.fields.reduce((acc, el, i) => {
    const should = {
      match_phrase: {
        [el]: {
          query: conf.text,
          slop: 3,
          analyzer: 'standard',
          zero_terms_query: 'none'
        }
      }
    }
    return [...acc, should]
  }, [])

  return arrShould
}

export const createQueryMatchPhrase = (conf: SearchConf) => {
  console.log(' Start MatchPhrase')

  const pageNumber = conf.page
  const arrShould = createArrMatchPhrase(conf)
  const pagination = createPagination(pageNumber)

  const resultQuery = {
    query: {
      bool: {
        should: arrShould
      }
    },
    ...pagination
  }

  return resultQuery
}

export const methodsSearch = {
  multi_match: (conf: SearchConf) => createQueryMultiMatch(conf),
  match_phrase: (conf: SearchConf) => createQueryMatchPhrase(conf)
}
