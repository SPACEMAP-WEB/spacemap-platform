/* eslint-disable @typescript-eslint/comma-dangle */
import {
  FavoriteColumnType,
  FavoriteDataType,
  FavoriteFindDataType,
} from '@app.modules/types/conjunctions'
import { Table } from '@app.components/common/Table'
import { Column, useTable, CellProps, useRowSelect, usePagination } from 'react-table'
import React, { useEffect, useMemo, useState } from 'react'
import {
  useQueryFavorite,
  useQueryFindFavorite,
} from '@app.feature/favorite/query/useQueryFavorite'
import {
  favoriteDataRefactor,
  favoriteFindDataRefactor,
} from '@app.feature/favorite/module/favoriteDataRefactor'
import IndeterminateCheckbox from '@app.components/common/IndeterminateCheckbox'
import {
  useDeleteMutationFavorite,
  usePostMutationFavorite,
} from '@app.feature/favorite/query/useMutationFavorite'
import { useQueryClient } from 'react-query'
import { API_FAVORITE, API_FAVORITE_CONJUNCTIONS } from '@app.modules/keyFactory'
import ConjunctionsPagination from '../../conjunctions/component/ConjunctionsPagination'
import styled from 'styled-components'
import { updateBookmarkData } from '../module/bookmarkDataCompare'
import { winodwHeightFn } from '@app.modules/util/windowHeightFn'

const borderStyle = {
  border: '1px solid gray',
}

const ConjunctionsFavoriteTable = ({ inputValue }: { inputValue: string }) => {
  const size = winodwHeightFn(window.innerHeight)
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
  const {
    data: favoriteFindData,
    isLoading: findIsLoading,
    isSuccess: findIsSuccess,
  } = useQueryFindFavorite(inputValue)

  const favoriteData = inputValue ? favoriteFindData : favoriteInitialData
  const isLoading = inputValue ? findIsLoading : initialIsLoading
  const isSuccess = inputValue ? findIsSuccess : initialIsSuccess

  const favoritePostMutation = usePostMutationFavorite()
  const favoriteDeleteMutation = useDeleteMutationFavorite()

  const COLUMNS: Column<FavoriteColumnType>[] = [
    { Header: 'Norad ID', accessor: 'noradId' },
    { Header: 'Sat. Name', accessor: 'satName' },
  ]

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])

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
          Cell: ({ row }: CellProps<any>) => (
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
    if (isSuccess) {
      const newData = inputValue
        ? favoriteFindDataRefactor(favoriteData as FavoriteFindDataType[])
        : favoriteDataRefactor(favoriteData as FavoriteDataType)
      setTableData(newData)
      if (!inputValue) setBookmarkData(newData)
    }
  }, [isSuccess, favoriteData])

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
      const size = winodwHeightFn(window.innerHeight)
      setCustomPageSize(size)
      setPageSize(size)
    }, 800)
    setTimer(newTimer)
  }

  useEffect(() => {
    window.addEventListener('resize', sizeFunction)
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
      <ConjunctionsPagination {...paginationProps} />
    </StyledWrapper>
  )
}

export default ConjunctionsFavoriteTable

const StyledWrapper = styled.div`
  margin-top: 10px;
  .table {
    font-size: 11px;
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