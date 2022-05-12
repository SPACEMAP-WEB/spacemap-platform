import { FavoriteColumnType } from '@app.modules/types/conjunctions'
import { Table } from '@app.components/common/Table'
import { Column, useTable } from 'react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useQueryFavorite } from '@app.feature/conjunctions/query/useQueryFavorite'
import {
  favoriteDataRefactor,
  favoriteFindDataRefactor,
} from '@app.feature/conjunctions/module/favoriteDataRefactor'

const borderStyle = {
  border: '1px solid gray',
}

const ConjuctionsFavroiteTable = ({ inputValue }: { inputValue: string }) => {
  const [tableData, setTableData] = useState<FavoriteColumnType[]>([])

  const COLUMNS: Column<FavoriteColumnType>[] = [
    {
      Header: 'Interested Satellites',
      columns: [
        { Header: 'NoradId', accessor: 'noradId' },
        { Header: 'SatName', accessor: 'satName' },
      ],
    },
  ]

  const { data: favoriteData, isLoading } = useQueryFavorite(inputValue)

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    if (favoriteData) {
      const newData = inputValue
        ? favoriteFindDataRefactor(favoriteData)
        : favoriteDataRefactor(favoriteData)
      setTableData(newData)
    }
  }, [favoriteData])

  if (isLoading) return null

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} style={borderStyle}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default ConjuctionsFavroiteTable
