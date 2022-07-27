import { useTimeFormatHandler } from '@app.modules/hooks/useTimeFormatHandler'
import { TimeFormatType } from '@app.modules/types/time'
import { useRef } from 'react'
import { PPDBSearchParamsType, SortType } from '../types/conjunctions'

type ConjunctionsEventHandlerProps = {
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
}

const useConjunctionsEventHandler = ({
  queryParams,
  setQueryParams,
}: ConjunctionsEventHandlerProps) => {
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
    inputRef,
    handleFavoriteSearch,
    handleSortFilterChange,
    handleTimeChange,
    handleKeyPress,
  }
}

export default useConjunctionsEventHandler
