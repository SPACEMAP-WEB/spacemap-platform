import { Table } from '@app.components/Table'
import { LPDBResponseDataType } from '@app.feature/launchConjunctions/types/launchConjunctions'
import CesiumModule from '@app.modules/cesium/cesiumModule'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useEffect, useRef, useState } from 'react'
import { CellProps, Column, useTable } from 'react-table'
import styled from 'styled-components'
import useLPDBTableData from '../hooks/useLPDBTableData'
import { useMutationDeleteLPDB } from '../query/useMutationLPDB'
import LPDBDetailTable from './LPDBDetailTable'

type LPDBProps = {
  LPDBData: LPDBResponseDataType[]
  handleNewLaunchClick: () => void
  cesiumModule: CesiumModule
}

const LPDBTable = ({ LPDBData, handleNewLaunchClick, cesiumModule }: LPDBProps) => {
  const [isDetailClicked, setIsDetailClicked] = useState<boolean>(false)
  const [selectedLPDBId, setSelectedLPDBId] = useState<string>('')
  const { columns, data } = useLPDBTableData(LPDBData)
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const { isVisible: isLaunchConjunctionsClicked } = useModal('LAUNCHCONJUNCTIONS')
  const { mutate } = useMutationDeleteLPDB()

  const handleDetailClick = async (id: string) => {
    setSelectedLPDBId(id)
    setIsDetailClicked(true)
  }

  const handleDelete = (id: string) => {
    mutate(id)
  }

  const handleBackButton = () => {
    setIsDetailClicked(false)
  }

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
    },
    (hooks) => {
      hooks.visibleColumns.push((columns: Column<LPDBResponseDataType>[]) => {
        columns[3] = {
          Header: 'Status',
          accessor: 'status',
          Cell: ({ row, value }: CellProps<LPDBResponseDataType>) => (
            <>
              {row.original.status === 'DONE' ? (
                <div
                  onClick={() => {
                    handleDetailClick(row.original['_id'])
                  }}
                  style={{ color: '#fccb16', cursor: 'pointer' }}
                >
                  <span>
                    {'Success'}
                    {'   '}
                    <img src="/svg/right-arrow.svg" style={{ width: '5px', cursor: 'pointer' }} />
                  </span>
                </div>
              ) : (
                <div>{row.original.status === 'PENDING' ? 'Pending' : 'Failed'}</div>
              )}
            </>
          ),
        }
        columns[4] = {
          id: 'delete',
          Header: '',
          Cell: ({ row }) => (
            <img
              src="/svg/trashbin.svg"
              style={{ width: '14px', cursor: 'pointer' }}
              onClick={() => handleDelete(row.original._id)}
            />
          ),
        }
        return columns
      })
    }
  )

  useEffect(() => {
    if (!tableContainerRef || !tableContainerRef.current) return
    if (!tableRef || !tableRef.current) return

    tableContainerRef.current.style.visibility = isLaunchConjunctionsClicked ? 'visible' : 'hidden'
    tableContainerRef.current.style.transform = `translateX(${
      isLaunchConjunctionsClicked ? '0' : '40rem'
    })`
  })

  return (
    <>
      <LPDBTableWrapper ref={tableContainerRef}>
        {!isDetailClicked ? (
          <>
            <div className="launch-conjunction-header">
              <h1 className="title">Launch Conjunctions</h1>
              <button onClick={handleNewLaunchClick} className="new-launch-container">
                + New Launch
              </button>
            </div>
            <div className="table-wrapper">
              <Table className="table" {...getTableProps()} ref={tableRef} css={tableWidthStyle}>
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
          </>
        ) : (
          <LPDBDetailTable
            handleBackButton={handleBackButton}
            LPDBId={selectedLPDBId}
            cesiumModule={cesiumModule}
          />
        )}
      </LPDBTableWrapper>
    </>
  )
}

export default LPDBTable

const LPDBTableWrapper = styled.div`
  width: 500px;
  padding: 1.5rem;
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
  .launch-conjunction-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      color: white;
      font-size: 20px;
      margin-bottom: 15px;
    }
    .new-launch-container {
      width: 100px;
      height: 36px;
      font-size: 12px;
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
  }
  .table-wrapper {
    width: 480px;
    max-height: 300px;
    overflow-y: scroll;
    border-radius: 10px;
    object-fit: cover;
    ::-webkit-scrollbar {
      width: 6.5px;
      background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #8d8d8d77;
      border-radius: 50px;
    }
    .table {
      font-size: 11px;
    }
  }
`

const tableWidthStyle = `
th:nth-of-type(1) { width: 150px; }
th:nth-of-type(2) { width: 20px; }
th:nth-of-type(3) { width: 100px; }
th:nth-of-type(4) { width: 20px; }
th:nth-of-type(5) { width: 10px; }
`
