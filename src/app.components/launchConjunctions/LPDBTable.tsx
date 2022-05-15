import { LPDBResponseDataType } from '@app.modules/types/launchConjunctions'
import React, { useEffect, useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Column, useTable } from 'react-table'
import { Table } from '@app.components/common/Table'
import { useModal } from '@app.modules/hooks/useModal'
import AssessmentModal from './AssessmentModal'

const COLUMNS: Column<LPDBResponseDataType>[] = [
  {
    Header: 'ID',
    accessor: 'email',
  },
  {
    Header: 'Type',
    Cell: <div>LCA</div>,
  },
  {
    Header: 'Date',
    accessor: 'createdAt',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
]

type LPDBProps = {
  LPDBData: LPDBResponseDataType[]
}

const LPDBTable = ({ LPDBData }: LPDBProps) => {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => LPDBData, [LPDBData])
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const { modalType, modalVisible } = useModal('LAUNCHCONJUNCTIONS')
  const isLaunchConjunctionsClicked = modalType === 'LAUNCHCONJUNCTIONS' && modalVisible

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  })

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isLaunchConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isLaunchConjunctionsClicked ? '0' : '40rem'
    })`
  })

  const handleNewLaunchButtonClick = () => {}

  return (
    <LPDBTableWrapper ref={tableContainerRef}>
      <button onClick={handleNewLaunchButtonClick} className="new-launch-container">
        New Launch
      </button>
      <div className="table-wrapper">
        <Table className="table" {...getTableProps()} ref={tableRef}>
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
  )
}

export default LPDBTable

const LPDBTableWrapper = styled.div`
  width: 450px;
  padding: 1rem 0;
  background-color: rgba(84, 84, 84, 0.4);
  border-radius: 15px;
  position: fixed;
  z-index: 4;
  right: 1.25rem;
  top: 5.5rem;
  transition: all 0.5s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
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
