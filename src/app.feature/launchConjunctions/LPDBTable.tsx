import { LPDBResponseDataType } from '@app.modules/types/launchConjunctions'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { Column, useTable, CellProps } from 'react-table'
import { Table } from '@app.components/common/Table'
import { useModal } from '@app.modules/hooks/useModal'
import { useMutationDeleteLPDB } from './query/useMutationLPDB'
import LPDBDetailTable from './LPDBDetailTable'
import { useQueryGetLPDBDownload } from './query/useQueryLPDB'

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
  handleNewLaunchClick: () => void
}

const LPDBTable = ({ LPDBData, handleNewLaunchClick }: LPDBProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isDoneStatusClicked, setIsDoneStatusClicked] = useState<boolean>(false)
  const [selectedLPDBId, setSelectedLPDBId] = useState<string>('')
  const [selectedPath, setSelectedPath] = useState<string>('')
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => LPDBData, [LPDBData])
  const tableContainerRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLTableElement>(null)
  const { modalType, modalVisible } = useModal('LAUNCHCONJUNCTIONS')
  const isLaunchConjunctionsClicked = modalType === 'LAUNCHCONJUNCTIONS' && modalVisible
  const { mutate } = useMutationDeleteLPDB()

  const { data: downloadData, refetch } = useQueryGetLPDBDownload(selectedPath)

  useEffect(() => {
    if (isVisible) {
      // FIXME: implement proper view logic
      console.log('hi')
    }
  }, [isVisible])

  const handleDetailClick = (id: string) => {
    setSelectedLPDBId(id)
    setIsDoneStatusClicked(true)
  }

  const handleDelete = (id: string) => {
    mutate(id)
    // FIXME: CORS issue
  }

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleBackButton = () => {
    setIsDoneStatusClicked(false)
  }

  const handleDownload = async (filePath: string) => {
    setSelectedPath(filePath)
    if (selectedPath) {
      const response = await refetch()

      const element = document.createElement('a')
      const textFile = new Blob([response.data.data], {
        type: 'text/plain',
      })
      element.href = URL.createObjectURL(textFile)
      element.download = 'trajectory_result.txt'
      document.body.appendChild(element)
      element.click()
      setSelectedPath('')
    }
  }

  // const exportTxt = useCallback(() => {
  //   let fileName = '파일이름.txt';
  //   let output = "string 타입의 데이터";
  //   const element = document.createElement('a');
  //   const file = new Blob([output], {
  //     type: 'text/plain',
  //   });
  //   element.href = URL.createObjectURL(file);
  //   element.download = fileName;
  //   document.body.appendChild(element); // FireFox
  //   element.click();
  // },[])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
    {
      columns,
      data,
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        const newColumns = columns.map((columnObject) => {
          if (columnObject.id === 'status') {
            return {
              ...columnObject,
              Cell: ({ row, value }: CellProps<any>) => (
                <>
                  {value === 'DONE' ? (
                    <div
                      onClick={() => handleDetailClick(row.original['_id'])}
                      style={{ color: '#fccb16', cursor: 'pointer' }}
                    >
                      <span>
                        {value}
                        {'   '}
                        <img
                          src="/svg/right-arrow.svg"
                          style={{ width: '5px', cursor: 'pointer' }}
                          onClick={() => {}}
                        />
                      </span>
                    </div>
                  ) : (
                    <div>{value}</div>
                  )}
                </>
              ),
            }
          }
          return columnObject
        })
        return [
          {
            id: 'visibility',
            Header: 'view',
            Cell: () => (
              <img
                style={{
                  width: '15px',
                  cursor: 'pointer',
                }}
                onClick={handleVisibility}
                src={isVisible ? '/svg/open-eye.svg' : '/svg/close-eye.svg'}
                alt="view"
              />
            ),
          },
          ...newColumns,
          {
            id: 'download',
            Header: 'download',
            Cell: ({ row }) => (
              <>
                {row.original.status === 'DONE' ? (
                  <img
                    src="/svg/download.svg"
                    style={{ width: '13px', cursor: 'pointer' }}
                    onClick={() => handleDownload(row.original.trajectoryPath)}
                  />
                ) : (
                  <div>-</div>
                )}
              </>
            ),
          },
          {
            id: 'delete',
            Header: '',
            Cell: ({ row }) => (
              <img
                src="/svg/trashbin.svg"
                style={{ width: '14px', cursor: 'pointer' }}
                onClick={() => handleDelete(row.original._id)}
              />
            ),
          },
        ]
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
        {!isDoneStatusClicked ? (
          <>
            <button onClick={handleNewLaunchClick} className="new-launch-container">
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
          </>
        ) : (
          <LPDBDetailTable handleBackButton={handleBackButton} LPDBId={selectedLPDBId} />
        )}
      </LPDBTableWrapper>
    </>
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
