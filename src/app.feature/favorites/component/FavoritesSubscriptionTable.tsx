/* eslint-disable @typescript-eslint/comma-dangle */
import IndeterminateCheckbox from '@app.components/IndeterminateCheckbox'
import { Table } from '@app.components/Table'
import {
  favoriteDataRefactor,
  favoriteFindDataRefactor,
} from '@app.feature/favorites/module/favoriteDataRefactor'
import {
  useDeleteMutationFavorite,
  usePostMutationFavorite,
} from '@app.feature/favorites/query/useMutationFavorite'
import { API_FAVORITE, API_FAVORITE_CONJUNCTIONS } from '@app.modules/keyFactory'
import { responsiveCellSizeHandler } from '@app.modules/util/responsiveCellSizeHandler'
import React, { useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { CellProps, Column, usePagination, useRowSelect, useTable } from 'react-table'
import styled from 'styled-components'
import Pagination from '../../../app.components/Pagination'
import useFavoriteTableData from '../hooks/useFavoriteTableData'
import { updateBookmarkData } from '../module/bookmarkDataCompare'
import { useQueryFavorite, useQuerySearchFavorite } from '../query/useQueryFavorites'
import { FavoriteColumnType, FavoriteDataType, FavoriteFindDataType } from '../types/favorite'

const borderStyle = {
  border: '1px solid gray',
}

const FavoritesSubscriptionTable = ({ inputValue }: { inputValue: string }) => {
  const size = responsiveCellSizeHandler(window.innerHeight)
  const queryClient = useQueryClient()
  const [customPageSize, setCustomPageSize] = useState(size)
  const [timer, setTimer] = useState(null)
  const [tableData, setTableData] = useState<FavoriteColumnType[]>([])
  const [bookmarkData, setBookmarkData] = useState<FavoriteColumnType[]>([])
  const [prevInput, setPrevInput] = useState(inputValue)

  const {
    data: favoriteInitialData,
    isLoading: initialIsLoading,
    isSuccess: initialIsSuccess,
  } = useQueryFavorite(inputValue)
  const { columns, data } = useFavoriteTableData(tableData)

  const {
    data: favoriteFindData,
    isLoading: findIsLoading,
    isSuccess: findIsSuccess,
  } = useQuerySearchFavorite(inputValue)

  const favoriteData = inputValue ? favoriteFindData : favoriteInitialData
  const isLoading = inputValue ? findIsLoading : initialIsLoading
  const isSuccess = inputValue ? findIsSuccess : initialIsSuccess

  const favoritePostMutation = usePostMutationFavorite()
  const favoriteDeleteMutation = useDeleteMutationFavorite()

  useEffect(() => {
    if (isSuccess) {
      const newData = inputValue
        ? favoriteFindDataRefactor(favoriteData as FavoriteFindDataType[])
        : favoriteDataRefactor(favoriteData as FavoriteDataType)
      setTableData(newData)
      if (!inputValue) setBookmarkData(newData)
    }
  }, [isSuccess, favoriteData])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    selectedFlatRows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    pageCount,
    setPageSize,
    previousPage,
    state: { selectedRowIds, pageIndex },
  } = useTable<FavoriteColumnType>(
    {
      columns,
      data,
      initialState: {
        selectedRowIds: tableData.reduce((data, ppdb, idx) => {
          if (ppdb.isInterested) {
            data[idx] = true
          }
          return data
        }, {}),
        pageIndex: 0,
        pageSize: customPageSize,
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
          Cell: ({ row }: CellProps<FavoriteColumnType>) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
      ])
    }
  )

  const handlePage = async (callback) => {
    callback()
  }

  const paginationProps = {
    gotoPage,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageOptions,
    handlePage,
  }

  const requsetMutationApi = async (
    state: string,
    bookmarks: FavoriteColumnType[],
    originData: FavoriteColumnType[]
  ) => {
    const mutation = state === 'delete' ? favoriteDeleteMutation : favoritePostMutation
    await Promise.all(bookmarks.map(async (boomark) => await mutation.mutateAsync(boomark.noradId)))
    setBookmarkData(originData)
    queryClient.invalidateQueries([API_FAVORITE_CONJUNCTIONS])
    queryClient.invalidateQueries([API_FAVORITE])
  }

  useEffect(() => {
    try {
      if (inputValue === '' && selectedFlatRows.length === 0 && bookmarkData.length === 0) return
      const originData = selectedFlatRows.map((row) => row.original)
      if (inputValue !== prevInput) {
        setPrevInput(inputValue)
        setBookmarkData(originData)
        return
      }
      const { state, data } = updateBookmarkData(bookmarkData, originData)
      if (data.length) requsetMutationApi(state, data, originData)
    } catch (error) {
      console.error(error)
    }
  }, [selectedRowIds])

  const sizeFunction = () => {
    if (timer) clearTimeout(timer)
    const newTimer = setTimeout(() => {
      const size = responsiveCellSizeHandler(window.innerHeight)
      setCustomPageSize(size)
      setPageSize(size)
    }, 800)
    setTimer(newTimer)
  }

  useEffect(() => {
    window.addEventListener('resize', sizeFunction)

    return window.removeEventListener('resize', sizeFunction)
  }, [])

  if (isLoading) return null

  return (
    <StyledWrapper>
      <Table className="table" {...getTableProps()} css={tableWidthStyle}>
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
          {page.map((row) => {
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
      <Pagination {...paginationProps} />
    </StyledWrapper>
  )
}

export default FavoritesSubscriptionTable

const StyledWrapper = styled.div`
  margin-top: 10px;
  .table {
    font-size: 11px;
    margin-bottom: 1.2rem;
  }
  @media screen and (min-width: 1920px) {
    .table {
      font-size: 13px;
    }
  }

  .pagination {
    margin-top: 10px;
    .pagination-count {
      color: white;
      font-weight: bold;
    }
  }
`

const tableWidthStyle = `
th:nth-of-type(1) { width: 50px; padding:10px}
th:nth-of-type(2) { width: 120px; }
th:nth-of-type(3) { width: 50px; }
`
