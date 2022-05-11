import { FavoriteColumnType } from '@app.modules/types/conjunctions'
import { Column, useTable } from 'react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useQueryFavorite } from '@app.feature/conjunctions/query/useQueryFavorite'

const ConjuctionsFavroiteTable = () => {
  const [tableData, setTableData] = useState([])
  const COLUMNS: Column<FavoriteColumnType>[] = [
    { Header: 'NoradId', accessor: 'noradId' },
    { Header: 'SatName', accessor: 'satName' },
  ]

  const { data: favoriteData } = useQueryFavorite()

  console.log(favoriteData)

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => favoriteData, [favoriteData])

  // useTable({ columns, data })

  // useEffect(() => {
  //   setTableData(favoriteData)
  // }, [favoriteData])

  return <div></div>
}

export default ConjuctionsFavroiteTable
