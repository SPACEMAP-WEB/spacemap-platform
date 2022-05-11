import { FavoriteColumnType } from '@app.modules/types/conjunctions'
import { Column } from 'react-table'
import React from 'react'

const ConjuctionsFavroiteTable = () => {
  const COLUMNS: Column<FavoriteColumnType>[] = [
    { Header: 'NoradId', accessor: 'noradId' },
    { Header: 'SatName', accessor: 'satName' },
  ]

  return <div></div>
}

export default ConjuctionsFavroiteTable
