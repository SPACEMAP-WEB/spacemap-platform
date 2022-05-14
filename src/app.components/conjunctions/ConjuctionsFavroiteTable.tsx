/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'
import { Table } from '@app.components/common/Table'
import { Column, useTable, CellProps, useRowSelect, usePagination } from 'react-table'
import React, { useEffect, useMemo, useState } from 'react'
import IndeterminateCheckbox from '@app.components/common/IndeterminateCheckbox'
import {
  useDeleteMutationFavorite,
  usePostMutationFavorite,
} from '@app.feature/conjunctions/query/useMutationFavorite'
import { updateBookmarkData } from '@app.feature/conjunctions/module/bookmakrDataCompare'
import { useQueryClient } from 'react-query'
import { API_FAVORITE } from '@app.modules/keyFactory'

type TProps = {
  inputValue: string
  isLoading: boolean
  isSuccess: boolean
  tableData: FavoriteColumnType[]
  bookmarkData: any
  setBookmarkData: any
  favoriteData: FavoriteDataType | FavoriteFindDataType[]
}

const borderStyle = {
  border: '1px solid gray',
}

const ConjuctionsFavoriteTable = ({
  inputValue,
  isLoading,
  tableData,
  bookmarkData,
  setBookmarkData,
  favoriteData,
}: TProps) => {
  const queryClient = useQueryClient()
  const [prevInput, setPrevInput] = useState(inputValue)

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

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
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

  console.log('seletcted', selectedFlatRows, selectedRowIds)

  const requsetMutationApi = async (state: string, bookmarks: FavoriteColumnType[], originData) => {
    const mutation = state === 'delete' ? favoriteDeleteMutation : favoritePostMutation
    await Promise.all(bookmarks.map((bookmark) => mutation.mutateAsync(bookmark.noradId)))
    setBookmarkData(originData)
    queryClient.invalidateQueries([API_FAVORITE])
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
      if (data.length) requsetMutationApi(state, data, originData)
      console.log('bookmark')
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
