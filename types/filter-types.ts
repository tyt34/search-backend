export type QueryObjFilter = {
  range: Record<'postId' | 'id', { gte: number; lte: number }>
}

export type ConfFilter = {
  type: string[]
  from: number[]
  to: number[]
  page: number
}
