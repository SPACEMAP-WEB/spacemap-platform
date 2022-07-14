import { Table } from '@app.components/Table'
import React, { useEffect, useMemo, useState } from 'react'
import { Column, useTable } from 'react-table'
import { drawLcaConjunctions } from 'src/app.store/cesium/cesiumReducer'
import { useAppDispatch } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import { lpdbDataRefactor } from '../module/lpdbDataRefactor'
import { useQueryGetLPDBDetail, useQueryGetTrajectory } from '../query/useQueryLPDB'
import { LPDBDataType } from '../types/launchConjunctions'

type LPDBDetailProps = {
  LPDBId: string
  handleBackButton: () => void
}

const LPDBDetailTable = ({ handleBackButton, LPDBId }: LPDBDetailProps) => {
  const dispatch = useAppDispatch()
  const { data: LPDBDetailData } = useQueryGetLPDBDetail(LPDBId)
  const { data: downloadData } = useQueryGetTrajectory(LPDBDetailData?.trajectoryPath)
  const [tableData, setTableData] = useState<LPDBDataType[]>([] as LPDBDataType[])

  useEffect(() => {
    if (!!LPDBDetailData) {
      setTableData(lpdbDataRefactor(LPDBDetailData.lpdb))
    }
  }, [LPDBDetailData])

  useEffect(() => {
    if (LPDBDetailData && downloadData) {
      const newData = lpdbDataRefactor(LPDBDetailData.lpdb)
      dispatch(
        drawLcaConjunctions({
          trajectory: downloadData.data,
          predictionEpochTime: LPDBDetailData.predictionEpochTime,
          launchEpochTime: LPDBDetailData.launchEpochTime,
          trajectoryLength: LPDBDetailData.trajectoryLength,
          lpdb: newData,
        })
      )
    }
  }, [LPDBDetailData, downloadData])

  const data = useMemo(() => tableData, [tableData])
  const columns: Column<LPDBDataType>[] = useMemo(
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
      <LPDBTableWrapper>
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
      </LPDBTableWrapper>
    </>
  )
}

export default LPDBDetailTable

const LPDBTableWrapper = styled.div`
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
