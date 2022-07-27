import { PPDBSearchParamsType, SortType } from '@app.feature/conjunctions/types/conjunctions'
import { useTimeFormatHandler } from '@app.modules/hooks/useTimeFormatHandler'
import { TimeFormatType } from '@app.modules/types/time'
import { useRef } from 'react'

type FavoriteEventHandlerProps = {
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
}

const useFavoritesEventHandler = ({ queryParams, setQueryParams }: FavoriteEventHandlerProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { handleSetTimeFormat } = useTimeFormatHandler()

  const handleFavoriteSearch = async () => {
    setQueryParams({
      ...queryParams,
      page: 0,
      satellite: inputRef.current.value,
    })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleFavoriteSearch()
    }
  }

  const handleSortFilterChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSetTimeFormat(e.target.value as TimeFormatType)
  }

  return {
    inputRef,
    handleKeyPress,
    handleFavoriteSearch,
    handleSortFilterChange,
    handleFavoriteIdChange,
    handleTimeChange,
  }
}

export default useFavoritesEventHandler
