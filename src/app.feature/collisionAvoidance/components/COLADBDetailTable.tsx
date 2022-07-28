import { Table } from '@app.components/Table'
import React, { useEffect, useMemo, useState } from 'react'
import { Column, useTable } from 'react-table'
// import { drawLcaConjunctions } from 'src/app.store/cesium/cesiumReducer'
// import { useAppDispatch } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import { coladbDataRefactor } from '../module/coladbDataRefactor'
import { useQueryGetCOLADBDetail, useQueryGetTrajectory } from '../query/useQueryCOLADB'
import { COLADBDataType } from '../types/collisionAvoidance'

type COLADBDetailProps = {
  COLADBId: string
  handleBackButton: () => void
}

const COLADBDetailTable = ({ handleBackButton, COLADBId }: COLADBDetailProps) => {
  // const dispatch = useAppDispatch()
  const { data: COLADBDetailData } = useQueryGetCOLADBDetail(COLADBId)
  const { data: downloadData } = useQueryGetTrajectory(COLADBDetailData?.trajectoryPath)
  const [tableData, setTableData] = useState<COLADBDataType[]>([] as COLADBDataType[])

  useEffect(() => {
    if (!!COLADBDetailData) {
      setTableData(coladbDataRefactor(COLADBDetailData.coladb))
    }
  }, [COLADBDetailData])

  useEffect(() => {
    if (COLADBDetailData && downloadData) {
      // const newData = coladbDataRefactor(COLADBDetailData.coladb)
      // dispatch(
      //   drawLcaConjunctions({
      //     trajectory: downloadData.data,
      //     predictionEpochTime: COLADBDetailData.predictionEpochTime,
      //     launchEpochTime: COLADBDetailData.launchEpochTime,
      //     trajectoryLength: COLADBDetailData.trajectoryLength,
      //     coladb: newData,
      //   })
      // )
    }
  }, [COLADBDetailData, downloadData])

  const data = useMemo(() => tableData, [tableData])
  const columns: Column<COLADBDataType>[] = useMemo(
    () => [
      {
        Header: 'Index',
        accessor: 'index',
      },
      {
        Header: 'Primary',
        accessor: (row) => {
          return Object.values(row.primary)
        },
      },
      {
        Header: 'Secondary',
        accessor: (row) => {
          return Object.values(row.secondary)
        },
      },
      {
        Header: 'TCA/DCA',
        accessor: (row) => {
          return Object.values(row['tca/dca'])
        },
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  })

  return (
    <>
      <COLADBTableWrapper>
        <div className="back-container" onClick={handleBackButton}>
          <img src="svg/left-arrow.svg" />
          Go Back
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
            {data.length && (
              <>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, index) => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td
                              rowSpan={cell.column.Header === 'Index' && index % 2 === 0 ? 2 : 1}
                              style={{
                                display:
                                  cell.column.Header === 'Index' && index % 2 === 1 ? 'none' : null,
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
        </div>
      </COLADBTableWrapper>
    </>
  )
}

export default COLADBDetailTable

const COLADBTableWrapper = styled.div`
  .back-container {
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    cursor: pointer;
    img {
      width: 11px;
      cursor: pointer;
      margin-left: 0.5rem;
    }
  }
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
    object-fit: cover;
    .table {
      font-size: 11px;
      tbody {
        overflow-y: scroll;
      }
    }
  }
`
