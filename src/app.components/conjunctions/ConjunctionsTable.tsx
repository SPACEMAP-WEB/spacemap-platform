import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Column, useTable } from 'react-table'
import {
  PPDBDataType,
  PPDBSearchParamsType,
  // eslint-disable-next-line @typescript-eslint/comma-dangle
  PPDBTableColumnType,
} from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useQueryGetInfinitePPDB } from '@app.feature/conjunctions/query/useQueryPPDB'
import { useModal } from '@app.modules/hooks/useModal'
import { useInView } from 'react-intersection-observer'
import Search from '@app.components/common/Search'
// import IndeterminateCheckbox from '@app.components/common/IndeterminateCheckbox'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import ConjuctionsFavorite from './ConjuctionsFavorite'
import ConjuctionsTabs from './ConjuctionsTabs'

const COLUMNS: Column<PPDBTableColumnType>[] = [
  {
    Header: 'Primary',
    accessor: 'primary',
  },
  {
    Header: 'Secondary',
    accessor: 'secondary',
  },
  {
    Header: 'DCA',
    accessor: 'dca',
  },
  {
    Header: 'TCA',
    accessor: 'tca',
  },
]

const ConjunctionsTable = () => {
  const [queryParams, setQueryParams] = useState<PPDBSearchParamsType>({
    limit: 10,
    page: 1,
  })
  const { login } = useSelector((state: RootState) => state.login)
  const [tableData, setTableData] = useState<PPDBDataType[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [isSearchClick, setIsSearchClick] = useState<boolean>(false)
  const [ref, inView] = useInView()
  const { modalType, modalVisible } = useModal('CONJUNCTIONS')
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const isConjunctionsClicked = modalType === 'CONJUNCTIONS' && modalVisible

  console.log(login)
  const {
    data: fetchedPPDBData,
    isLoading,
    fetchNextPage,
    refetch,
  } = useQueryGetInfinitePPDB({
    query: queryParams,
    isConjunctionsClicked,
  })

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
    }
    // (hooks) => {
    //   hooks.visibleColumns.push((columns: Column<PPDBTableColumnType>[]) => [
    //     ...columns,
    //     {
    //       id: 'bookmark',
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }: CellProps<any>) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //   ])
    // }
  )

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isConjunctionsClicked ? '0' : '40rem'
    })`
  })

  useEffect(() => {
    if (fetchedPPDBData) {
      const lastIndex = fetchedPPDBData.pages.length - 1
      const { result } = fetchedPPDBData.pages[lastIndex]
      const newData = result.map((item, index) => {
        const { _id, pid, sid, dca, tcaStartTime, tcaEndTime, tcaTime, probability } = item
        return {
          index,
          id: _id,
          primary: pid,
          secondary: sid,
          dca,
          start: tcaStartTime,
          tca: tcaTime,
          end: tcaEndTime,
          probability,
        }
      })
      setTableData(lastIndex === 0 ? newData : (prevState) => prevState.concat(newData))
    }
  }, [fetchedPPDBData])

  useEffect(() => {
    setIsSearchClick(false)
  }, [queryParams])

  useEffect(() => {
    if (isSearchClick) {
      refetch()
    }
  }, [isSearchClick, refetch])

  useEffect(() => {
    if (!data) return
    if (inView) fetchNextPage()
  }, [inView])

  const handleSearch = () => {
    setQueryParams({
      ...queryParams,
      satelite: searchValue,
    })
    setIsSearchClick(true)
  }

  return (
    <>
      {/* FIXME: change loading page into proper one */}
      {isLoading && <div>loading</div>}
      {data && (
        <ConjunctionsTableWrapper ref={tableContainerRef}>
          <Search
            handleSearch={handleSearch}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <ConjuctionsTabs />
          <section className="table-wrapper">
            <Table {...getTableProps()} ref={tableRef}>
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
                  <tbody {...getTableBodyProps()} style={{ overflowY: 'scroll' }}>
                    {rows.map((row) => {
                      prepareRow(row)
                      return (
                        <tr {...row.getRowProps()}>
                          {row.cells.map((cell) => (
                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          ))}
                        </tr>
                      )
                    })}
                  </tbody>
                  <tbody ref={ref} />
                </>
              )}
            </Table>
          </section>
          {true && <ConjuctionsFavorite />}
        </ConjunctionsTableWrapper>
      )}
    </>
  )
}

export default ConjunctionsTable

const ConjunctionsTableWrapper = styled.div`
  position: fixed;
  z-index: 4;
  right: 1.25rem;
  top: 5.5rem;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .table-wrapper {
    height: 480px;
    overflow-y: scroll;
  }
`
