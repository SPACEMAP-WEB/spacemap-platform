import { Table } from '@app.components/common/Table'
import React, { useMemo } from 'react'
import { Column, useTable } from 'react-table'
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
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  })

  return (
    <ConjunctionsTableWrapper>
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
  top: 5rem;
`
