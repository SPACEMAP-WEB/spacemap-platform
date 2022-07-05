import { Table } from '@app.components/Table'
import { ppdbDataRefactor } from '@app.feature/conjunctions/module/ppdbDataRefactor'
import { useQueryGetPPDB } from '@app.feature/conjunctions/query/useQueryPPDB'
import { PPDBDataType, PPDBSearchParamsType } from '@app.feature/conjunctions/types/conjunctions'
import { useDebounce } from '@app.modules/hooks/useDebounce'
import { useModal } from '@app.modules/hooks/useModal'
import { responsiveCellSizeHandler } from '@app.modules/util/responsiveCellSizeHandler'
import React, { useEffect, useMemo, useState } from 'react'
import { usePagination, useTable } from 'react-table'
import styled from 'styled-components'
import { useInstance } from '../module/useInstance'
import { tableWidthStyle } from '../style/tableStyle'
import Pagination from '../../../app.components/Pagination'
import { COLUMNS } from './TableColumns'

type TableProps = {
  queryParams: PPDBSearchParamsType
  setQueryParams: React.Dispatch<React.SetStateAction<PPDBSearchParamsType>>
  cesiumModule
  size: number
}

const ConjunctionsTable = ({
  queryParams,
  setQueryParams,
  cesiumModule,
  size,
}: TableProps) => {
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [customPageSize, setCustomPageSize] = useState(size)
  const { isVisible } = useModal('CONJUNCTIONS')
  const isConjunctionsClicked = isVisible
  const debounceFn = useDebounce(() => {
    const size = responsiveCellSizeHandler(window.innerHeight)
    setCustomPageSize(size)
    setPageSize(size)
    setQueryParams({ ...queryParams, limit: size })
  }, 800)

  const { data: fetchedPPDBData, isLoading } = useQueryGetPPDB({
    query: queryParams,
    isConjunctionsClicked,
  })

  const columns = useMemo(
    () => COLUMNS({ queryParams, customPageSize, cesiumModule }),
    [queryParams]
  )
  const data = useMemo(() => tableData, [tableData])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    pageCount,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable<PPDBDataType>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: size },
      manualPagination: true,
      pageCount: Math.ceil(fetchedPPDBData?.totalCount / customPageSize),
    },
    usePagination,
    (hooks) => {
      hooks.useInstance.push(useInstance)
    }
  )

  useEffect(() => {
    setQueryParams({ ...queryParams, page: pageIndex })
  }, [pageIndex])

  useEffect(() => {
    if (fetchedPPDBData) {
      const newData = ppdbDataRefactor(fetchedPPDBData.result)
      setTableData(newData)
    }
  }, [fetchedPPDBData])

  const handlePage = async (callback) => {
    callback()
  }

  useEffect(() => {
    window.addEventListener('resize', debounceFn)
  }, [])

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
    setPageSize,
    pageSize,
    setCustomPageSize,
    setQueryParams,
    queryParams,
  }

  if (isLoading) return <div>Loading</div>
  return (
    <StyledTable>
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
        {!!tableData.length && (
          <>
            <tbody {...getTableBodyProps()}>
              {page.map((row, index) => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td
                          rowSpan={(cell.column.id === 'Index' || cell.column.id ==='View') && index % 2 === 0 ? 2 : 1}
                          style={{
                            display: (cell.column.id === 'Index' || cell.column.id ==='View') && index % 2 === 1 ? 'none' : null,
                          }}
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </>
        )}
      </Table>
      <Pagination {...paginationProps} />
    </StyledTable>
  )
}

export default ConjunctionsTable

const StyledTable = styled.div`
  border-radius: 10px;
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
