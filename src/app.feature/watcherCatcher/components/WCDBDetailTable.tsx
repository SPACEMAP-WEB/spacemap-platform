import { Table } from '@app.components/Table'
import CesiumModule from '@app.modules/cesium/cesiumModule'
import React, { useEffect, useMemo, useState } from 'react'
import { Column, useTable } from 'react-table'
import { drawWatchaCapture } from 'src/app.store/cesium/cesiumReducer'
import { useAppDispatch } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import { useInstance } from '../module/useInstance'
import { wcdbDataRefactor } from '../module/wcdbDataRefactor'
import { useQueryGetWCDBDetail } from '../query/useQueryWCDB'
import { WCDBDataType } from '../types/watcherCatcher'

type WCDBDetailProps = {
  WCDBId: string
  handleBackButton: () => void
  cesiumModule: CesiumModule
}

const WCDBDetailTable = ({ handleBackButton, WCDBId, cesiumModule }: WCDBDetailProps) => {
  const dispatch = useAppDispatch()
  const { data: WCDBDetailData } = useQueryGetWCDBDetail(WCDBId)
  const [tableData, setTableData] = useState<WCDBDataType[]>([] as WCDBDataType[])

  useEffect(() => {
    if (!!WCDBDetailData) {
      setTableData(wcdbDataRefactor(WCDBDetailData?.wcdb))
      const newData = wcdbDataRefactor(WCDBDetailData.wcdb)
      dispatch(
        drawWatchaCapture({
          latitude: WCDBDetailData.latitude,
          longitude: WCDBDetailData.longitude,
          predictionEpochTime: WCDBDetailData.predictionEpochTime,
          epochTime: WCDBDetailData.epochTime,
          wcdb: newData,
        })
      )
    }
  }, [WCDBDetailData])

  const data = useMemo(() => tableData, [tableData])
  const columns: Column<WCDBDataType>[] = useMemo(
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

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } = useTable(
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
      <WCDBTableWrapper>
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
      </WCDBTableWrapper>
    </>
  )
}

export default WCDBDetailTable

const WCDBTableWrapper = styled.div`
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
