import api from '.'
import { API_PPDB } from '@app.modules/keyFactory'
import { PPDBSearchParamsType } from '@app.modules/types/conjunctions'

export const fetchPPDB = async (searchParams: PPDBSearchParamsType) => {
  const { limit, page, sort, dec, satelite } = searchParams
  const { data } = await api.GET(API_PPDB)
  return data
}
