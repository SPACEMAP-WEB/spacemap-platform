import { PPDBSearchParamsType, SortType } from '@app.feature/conjunctions/types/conjunctions'
import { useState, ChangeEvent } from 'react'

type FavoriteEventHandlerProps = {
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
}

const useFavoritesEventHandler = ({queryParams, setQueryParams}: FavoriteEventHandlerProps) => {
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

  const handleFavoriteIdChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    delete queryParams.satellite
    setQueryParams({
      ...queryParams,
      ...{ satellite: e.target.value },
    })
  }

  return { searchValue, handleSearchValueChange, handleFavoriteSearch, handleSortFilterChange, handleFavoriteIdChange }
}

export default useFavoritesEventHandler