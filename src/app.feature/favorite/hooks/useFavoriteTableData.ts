import { useMemo } from 'react'
import { Column } from 'react-table'
import { FavoriteColumnType } from '../types/favorite'

const useFavoriteTableData = (tableData: FavoriteColumnType[]) => {
  const COLUMNS: Column<FavoriteColumnType>[] = [
    { Header: 'Norad ID', accessor: 'noradId' },
    { Header: 'Sat. Name', accessor: 'satName' },
  ]
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])
  return { columns, data }
}

export default useFavoriteTableData
