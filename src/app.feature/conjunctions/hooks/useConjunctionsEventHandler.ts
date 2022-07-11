import { useTimeFormatHandler } from '@app.modules/hooks/useTimeFormatHandler'
import { TimeFormatType } from '@app.modules/types/time'
import { ChangeEvent, useState } from 'react'
import { PPDBSearchParamsType, SortType } from '../types/conjunctions'

type ConjunctionsEventHandlerProps = {
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
}

const useConjunctionsEventHandler = ({
  queryParams,
  setQueryParams,
}: ConjunctionsEventHandlerProps) => {
  const [searchValue, setSearchValue] = useState<string>('')
  const { handleSetTimeFormat } = useTimeFormatHandler()

  const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  const handleFavoriteSearch = async () => {
    setQueryParams({
      ...queryParams,
      page: 0,
      satellite: searchValue,
    })
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetTimeFormat(e.target.value as TimeFormatType)
  }

  const handleSortFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryParams({
      ...queryParams,
      sort: e.target.value as SortType,
    })
  }

  return {
    searchValue,
    handleSearchValueChange,
    handleFavoriteSearch,
    handleSortFilterChange,
    handleTimeChange,
  }
}

export default useConjunctionsEventHandler
