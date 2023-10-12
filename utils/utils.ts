import { sizeOnePage } from '../constants'

export const arrStrToArrNum = (arr: string[]): number[] => {
  return arr.map((el: string) => Number(el))
}

export const arrFilter = (arr: string[]) => {
  return arr.filter((el) => !!el)
}

export const getFrom = (num: number) => sizeOnePage * (num - 1)

export const splitText = (str: string) => str.split('_').join(' ')
