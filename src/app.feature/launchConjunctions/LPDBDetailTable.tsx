import { LPDBDataType, LPDBResponseDataType } from '@app.modules/types/launchConjunctions'
import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Column, useTable } from 'react-table'
import { Table } from '@app.components/common/Table'
import { useQueryGetLPDBDetail } from './query/useQueryLPDB'
import { lpdbDataRefactor } from './module/lpdbDataRefactor'
import { PPDBDataType } from '@app.modules/types/conjunctions'
import { useInstance } from './module/useInstance'
import CesiumModule from '@app.modules/cesium/cesiumModule'

const COLUMNS: Column<LPDBDataType>[] = [
  {
    Header: 'Index',
    accessor: (row) => {
      return row.index
    },
    enableRowSpan: true,
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
]

type LPDBDetailProps = {
  LPDBId: string
  handleBackButton: () => void
  cesiumModule: CesiumModule
  trajectory: string
  predictionEpochTime: string
  launchEpochTime: string
}

const LPDBDetailTable = ({
  handleBackButton,
  LPDBId,
  cesiumModule,
  trajectory,
  predictionEpochTime,
  launchEpochTime,
}: LPDBDetailProps) => {
  const { isLoading, data: LPDBDetailData, isSuccess } = useQueryGetLPDBDetail(LPDBId)
  const [tableData, setTableData] = useState<PPDBDataType[]>([] as PPDBDataType[])

  useEffect(() => {
    if (LPDBDetailData) {
      const newData = lpdbDataRefactor(LPDBDetailData.data.data.lpdb)
      cesiumModule.drawLaunchConjunctions(trajectory, predictionEpochTime, launchEpochTime, newData)
      setTableData(newData)
    }
  }, [LPDBDetailData])

  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => tableData, [tableData])

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows, rowSpanHeaders } =
    useTable(
      {
        columns,
        data,
      },
      (hooks) => {
        hooks.useInstance.push(useInstance)
      }
    )

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
            {tableData.length && (
              <>
                <tbody {...getTableBodyProps()} style={{ overflowY: 'scroll' }}>
                  {rows.map((row, i) => {
                    prepareRow(row)
                    for (let j = 0; j < row.allCells.length; j++) {
                      let cell = row.allCells[j]
                      let rowSpanHeader = rowSpanHeaders.find((x) => x.id === cell.column.id)

                      if (rowSpanHeader !== undefined) {
                        if (i % 2 !== 1) {
                          cell.rowSpan = 2
                          cell.isRowSpanned = false
                        } else {
                          cell.isRowSpan = 1
                          cell.isRowSpanned = true
                        }
                      }
                    }
                    return null
                  })}
                  {rows.map((row) => {
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          if (cell.isRowSpanned) return null
                          else {
                            return (
                              <td
                                rowSpan={cell.rowSpan}
                                {...cell.getCellProps()}
                                style={borderStyle}
                              >
                                {cell.render('Cell')}
                              </td>
                            )
                          }
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

const borderStyle = {
  border: '1px solid gray',
}

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
