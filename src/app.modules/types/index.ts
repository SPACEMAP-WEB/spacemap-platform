// common types
export type FilterSelectType = {
  label: string
  value: string
}

export type DataResponseType<T> = {
  success: boolean
  message: string
  data: T
}
