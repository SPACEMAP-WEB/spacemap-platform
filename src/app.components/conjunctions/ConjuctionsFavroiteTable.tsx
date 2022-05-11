import { FavoriteColumnType } from '@app.modules/types/conjunctions'
import { Column } from 'react-table'
import React from 'react'
import { useQueryFavorite } from '@app.feature/conjunctions/query/useQueryFavorite'

const ConjuctionsFavroiteTable = () => {
  const COLUMNS: Column<FavoriteColumnType>[] = [
    { Header: 'NoradId', accessor: 'noradId' },
    { Header: 'SatName', accessor: 'satName' },
  ]

  const { data } = useQueryFavorite()

  return <div></div>
}

export default ConjuctionsFavroiteTable
