import { sizeOnePage } from '../constants'
import { FilterConf, QueryObjFilter } from '../types'
import { arrFilter, arrStrToArrNum, getFrom } from './utils'

export const createArrFilter = (conf: FilterConf) => {
  const arrQueryObj: QueryObjFilter[] = conf.type.reduce(
    (acc, el, i) => {
      const from = conf.from[i]
      const to = conf.to[i]
      const range = createRange(el, from, to)

      return [
        ...acc,
        {
          range: range
        }
      ]
    },
    []
  )

  return arrQueryObj
}

const createRange = (type: string, from: number, to: number) => {
  return {
    [type]: {
      gte: from,
      lte: to
    }
  }
}

export const createConfFilter = (query): FilterConf => {
  console.log({ query })
  const arrType = arrFilter(query.type)
  const arrFromStr = arrFilter(query.from)
  const arrFromNum = arrStrToArrNum(arrFromStr)
  const arrToStr = arrFilter(query.to)
  const arrToNum = arrStrToArrNum(arrToStr)
  const pageNumber = Number(query.page)

  const resultConf = {
    type: arrType,
    from: arrFromNum,
    to: arrToNum,
    page: pageNumber
  }

  return resultConf
}

export const createQueryFilter = (conf: FilterConf) => {
  const arrFilter = createArrFilter(conf)
  const pageNumber = Number(conf.page)

  const resultQuery = {
    query: {
      bool: {
        must: [...arrFilter]
      }
    },
    size: sizeOnePage,
    from: getFrom(pageNumber)
  }

  return resultQuery
}
