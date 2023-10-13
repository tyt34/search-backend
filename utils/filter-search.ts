import util = require('util')
import { sizeOnePage } from '../constants'
import { FilterConf, SearchConf } from '../types'
import { createArrFilter } from './filter'
import { createArrMatchPhrase, createObjMultiMatch } from './search'
import { getFrom } from './utils'

export const createFilterSearchQueryMultiMatch = (
  confFilter: FilterConf,
  confSearch: SearchConf
) => {
  const page = confFilter.page
  const text = confSearch.text
  const arrFields = confSearch.fields
  const objMultiMatch = createObjMultiMatch(text, arrFields)
  const arrFilter = createArrFilter(confFilter)

  const resultQuery = {
    query: {
      bool: {
        must: [
          {
            ...objMultiMatch
          },
          ...arrFilter
        ]
      }
    },
    size: sizeOnePage,
    from: getFrom(page)
  }

  return resultQuery
}

export const createFilterSearchQueryMatchPhrase = (
  confFilter: FilterConf,
  confSearch: SearchConf
) => {
  const page = confFilter.page
  const arrShould = createArrMatchPhrase(confSearch)
  const arrFilter = createArrFilter(confFilter)

  const resultQuery = {
    query: {
      bool: {
        must: [
          {
            bool: {
              should: arrShould
            }
          },
          ...arrFilter
        ]
      }
    },
    size: sizeOnePage,
    from: getFrom(page)
  }

  return resultQuery
}

export const methodsFilterSearch = {
  multi_match: (confFilter: FilterConf, confSearch: SearchConf) =>
    createFilterSearchQueryMultiMatch(confFilter, confSearch),
  match_phrase: (confFilter: FilterConf, confSearch: SearchConf) =>
    createFilterSearchQueryMatchPhrase(confFilter, confSearch)
}
