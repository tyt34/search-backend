// import util = require('util')
import { FilterConf, QueryObjFilter } from '../types'
import { createPagination } from './utils'

export const createArrFilter = (conf: FilterConf) => {
  const arrQueryObj: QueryObjFilter[] = ['id', 'postId'].reduce(
    (acc, el) => {
      const from = el === 'id' ? conf.fromId : conf.fromPost
      const to = el === 'id' ? conf.toId : conf.toPost

      const range: Record<string, { gte?: number; lte?: number }> = {
        [el]: {}
      }

      if (from !== '') {
        range[el].gte = Number(from)
      }

      if (to !== '') {
        range[el].lte = Number(to)
      }

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
  const pageNumber = Number(query.page)
  const fromId = query.from_id !== '' ? Number(query.from_id) : ''
  const toId = query.to_id !== '' ? Number(query.to_id) : ''
  const fromPost = query.from_post !== '' ? Number(query.from_post) : ''
  const toPost = query.to_post !== '' ? Number(query.to_post) : ''

  const resultConf = {
    fromId,
    toId,
    fromPost,
    toPost,
    page: pageNumber
  }

  return resultConf
}

export const createQueryFilter = (conf: FilterConf) => {
  const arrFilter = createArrFilter(conf)
  const pageNumber = Number(conf.page)
  const pagination = createPagination(pageNumber)

  // console.log({ arr: util.inspect(arrFilter, { depth: null }) })

  const resultQuery = {
    query: {
      bool: {
        must: [...arrFilter]
      }
    },
    ...pagination
  }

  return resultQuery
}
