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

  const handleSortFilterChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
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
  }
}

export default useConjunctionsEventHandler
