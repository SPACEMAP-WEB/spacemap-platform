/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'
import { Table } from '@app.components/common/Table'
import { Column, useTable, CellProps, useRowSelect, usePagination } from 'react-table'
import React, { useEffect, useMemo, useState } from 'react'
import { useQueryFavorite } from '@app.feature/conjunctions/query/useQueryFavorite'
import {
  favoriteDataRefactor,
  favoriteFindDataRefactor,
} from '@app.feature/conjunctions/module/favoriteDataRefactor'
import IndeterminateCheckbox from '@app.components/common/IndeterminateCheckbox'
import {
  useDeleteMutationFavorite,
  usePostMutationFavorite,
} from '@app.feature/conjunctions/query/useMutationFavorite'
import { updateBookmarkData } from '@app.feature/conjunctions/module/bookmakrDataCompare'

const borderStyle = {
  border: '1px solid gray',
}

const ConjuctionsFavoriteTable = ({ inputValue }: { inputValue: string }) => {
  const [tableData, setTableData] = useState<FavoriteColumnType[]>([])
  const [bookmarkData, setBookmarkData] = useState<FavoriteColumnType[]>([])
  const [prevInput, setPrevInput] = useState(inputValue)

  const { data: favoriteData, isLoading, isSuccess } = useQueryFavorite(inputValue)
  const favoritePostMutation = usePostMutationFavorite()
  const favoriteDeleteMutation = useDeleteMutationFavorite()

  const COLUMNS: Column<FavoriteColumnType>[] = [
    {
      Header: 'Interested Satellites',
      columns: [
        { Header: 'NoradId', accessor: 'noradId' },
        { Header: 'SatName', accessor: 'satName' },
      ],
    },
  ]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])

  useEffect(() => {
    if (isSuccess) {
      const newData = inputValue
        ? favoriteFindDataRefactor(favoriteData as FavoriteFindDataType[])
        : favoriteDataRefactor(favoriteData as FavoriteDataType)
      setTableData(newData)
      if (!inputValue) setBookmarkData(newData)
    }
  }, [isSuccess, favoriteData])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows } =
    useTable(
      {
        columns,
        data,
        initialState: {
          selectedRowIds: data.reduce((data, ppdb, idx) => {
            if (ppdb.isInterested) {
              data[idx] = true
            }
            return data
          }, {}),
        },
      },
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.visibleColumns.push((columns: Column<FavoriteColumnType>[]) => [
          ...columns,
          {
            id: 'bookmark',
            Header: (header) => {
              return (
                <div>
                  <IndeterminateCheckbox {...header.getToggleAllPageRowsSelectedProps()} />
                </div>
              )
            },
            Cell: ({ row }: CellProps<any>) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
        ])
      }
    )

  console.log(selectedFlatRows)

  const requsetMutationApi = async (state: string, bookmarks: FavoriteColumnType[]) => {
    const mutation = state === 'delete' ? favoriteDeleteMutation : favoritePostMutation
    await Promise.all(bookmarks.map(async (boomark) => await mutation.mutateAsync(boomark.noradId)))
  }

  useEffect(() => {
    try {
      if (inputValue === '' && selectedFlatRows.length === 0) return
      const originData = selectedFlatRows.map((row) => row.original)
      if (inputValue !== prevInput) {
        setPrevInput(inputValue)
        setBookmarkData(originData)
        return
      }
      const { state, data } = updateBookmarkData(bookmarkData, originData)
      setBookmarkData(originData)
      if (data.length) requsetMutationApi(state, data)
    } catch (error) {
      console.error(error)
    }
  }, [selectedFlatRows])

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
        {rows.map((row) => {
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

export default ConjuctionsFavoriteTable
