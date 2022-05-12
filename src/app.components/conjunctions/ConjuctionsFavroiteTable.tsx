import { FavoriteColumnType, FavoriteDataType } from '@app.modules/types/conjunctions'
import { Table } from '@app.components/common/Table'
import { Column, useTable } from 'react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useQueryFavorite } from '@app.feature/conjunctions/query/useQueryFavorite'

const borderStyle = {
  border: '1px solid gray',
}

const ConjuctionsFavroiteTable = () => {
  const [tableData, setTableData] = useState<FavoriteDataType>([])

  const fakeData = [
    { noradId: '123', satName: 'hello' },
    { noradId: '123', satName: 'hello' },
    { noradId: '123', satName: 'hello' },
    { noradId: '123', satName: 'hello' },
    { noradId: '123', satName: 'hello' },
    { noradId: '123', satName: 'hello' },
    { noradId: '123', satName: 'hello' },
  ]

  const COLUMNS: Column<FavoriteColumnType>[] = [
    {
      Header: 'Interested Satellites',
      columns: [
        { Header: 'NoradId', accessor: 'noradId' },
        { Header: 'SatName', accessor: 'satName' },
      ],
    },
  ]

  const { data: favoriteData } = useQueryFavorite()

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => fakeData, [tableData])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    if (favoriteData) {
      setTableData(favoriteData)
    }
  }, [favoriteData])

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
