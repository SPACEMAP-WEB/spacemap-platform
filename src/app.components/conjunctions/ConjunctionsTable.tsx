import { Table } from '@app.components/common/Table'
import React, { useEffect, useMemo, useRef } from 'react'
import { Column, useTable } from 'react-table'
import { PPDBData } from 'src/test/testData/PPDBData'
import { PPDBTableColumnType } from '@app.modules/types/conjunctions'
import styled from 'styled-components'
import { useModal } from '@app.modules/hooks/useModal'

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
  const { modalType, modalVisible } = useModal('CONJUCTIONS')
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const isConjunctionsClicked = modalType === 'CONJUCTIONS' && modalVisible

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isConjunctionsClicked ? 'visible' : 'hidden'
    tableRef.current.style.opacity = isConjunctionsClicked ? '1' : '0'
    tableContainerRef.current.style.transform = `translateX(${
      isConjunctionsClicked ? '0' : '30rem'
    })`
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
  transition: all 0.5s ease-out;
`
