import { LPDBResponseDataType } from '@app.modules/types/launchConjunctions'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Column, useTable, CellProps } from 'react-table'
import { Table } from '@app.components/common/Table'
import { useQueryGetLPDBDetail } from './query/useQueryLPDB'

const COLUMNS: Column<LPDBResponseDataType>[] = [
  {
    Header: 'Index',
    accessor: 'email',
  },
  {
    Header: 'Primary',
    Cell: <div>LCA</div>,
  },
  {
    Header: 'Secondary',
    accessor: 'createdAt',
  },
  {
    Header: 'TCA/DCA',
    accessor: 'status',
  },
]

type LPDBDetailProps = {
  LPDBId: string
  // handleNewLaunchClick: () => void
  handleBackButton: () => void
}

const LPDBDetailTable = ({ LPDBId, handleBackButton }: LPDBDetailProps) => {
  const { isLoading, data: LPDBDetailData, isSuccess } = useQueryGetLPDBDetail(LPDBId)

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => [], [])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  })

  return (
    <>
      <LPDBTableWrapper>
        <div>
          <img
            src="svg/left-arrow.svg"
            style={{ width: '11px', cursor: 'pointer' }}
            onClick={handleBackButton}
          />
        </div>
        <div className="table-wrapper">
          <Table className="table" {...getTableProps()}>
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
        </div>
      </LPDBTableWrapper>
    </>
  )
}

export default LPDBDetailTable

const LPDBTableWrapper = styled.div`
  .new-launch-container {
    width: 200px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.13);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(20px);
    gap: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    color: white;
    :hover {
      background-color: rgba(255, 255, 255, 0.18);
    }
  }
  .table-wrapper {
    width: 400px;
    border-radius: 10px;
    /* overflow-x: hidden; */
    object-fit: cover;
    .table {
      font-size: 11px;
    }
  }
`
