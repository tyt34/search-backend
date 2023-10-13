import { sizeOnePage } from '../constants'
import { transformData } from './transform-data'

/**
 * arrStrToArrNum(['1', '2']) -> [1, 2]
 * @param arr
 * @returns
 */
export const arrStrToArrNum = (arr: string[]): number[] => {
  return arr.map((el: string) => Number(el))
}

/**
 * arrFilter('a', 'b', '') -> ['a', 'b']
 * @param arr
 * @returns
 */
export const arrFilter = (arr: string[]) => {
  return arr.filter((el) => !!el)
}

/**
 * getFrom(1) -> 0
 * getFrom(2) -> 10
 * @param num
 * @returns
 */
export const getFrom = (num: number) => sizeOnePage * (num - 1)

/**
 * splitText('a_b_c') -> 'a b c'
 * @param str
 * @returns
 */
export const splitText = (str: string) => str.split('_').join(' ')

export const createPagination = (page: number) => {
  return {
    size: sizeOnePage,
    from: getFrom(page),
    track_total_hits: true
  }
}

export const getReqResult = (body) => {
  const resultReq = transformData(body.hits.hits)
  const totalReq = body.hits.total.value
  const result = { data: resultReq, total: totalReq }

  return result
}
