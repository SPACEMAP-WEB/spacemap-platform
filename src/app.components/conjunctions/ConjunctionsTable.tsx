import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useRef } from 'react'
import { Column, useTable } from 'react-table'
import { useMenuContext } from 'src/hooks/useMenuContext'
import { PPDBData } from 'src/test/testData/PPDBData'
import { PPDBTableColumnType } from 'src/types/conjunctions/PPDBType'
import styled from 'styled-components'

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
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => PPDBData, [PPDBData])
  const { state } = useMenuContext()
  const { isConjunctionsClicked } = state
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableRef.current.style.opacity = isConjunctionsClicked ? '1' : '0'
    tableRef.current.style.transform = `translateX(-${isConjunctionsClicked ? 0 : 1}00%)`
  })

  return (
    <ConjunctionsTableWrapper ref={tableContainerRef}>
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
        <tbody {...getTableBodyProps()}>
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
      </Table>
    </ConjunctionsTableWrapper>
  )
}

export default ConjunctionsTable

const ConjunctionsTableWrapper = styled.div`
  position: fixed;
  z-index: 4;
  right: 1.25rem;
  top: 5.5rem;
  transition: all 0.8s ease-out;
`
