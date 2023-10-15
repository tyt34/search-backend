export type QueryObjFilter = {
  range: Record<'postId' | 'id', { gte: number; lte: number }>
}

export type FilterConf = {
  fromId: number | string
  toId: number | string
  fromPost: number | string
  toPost: number | string
  page: number
}
