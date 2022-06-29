import { useMemo } from 'react'
import { Column } from 'react-table'
import { WCDBDataType } from '../types/watcherCatcher'

const useWCDBDetailTableData = (WCDBDetailData: WCDBDataType[]) => {
  console.log(WCDBDetailData)
  if (WCDBDetailData === undefined) return
  const data = useMemo(() => Object.values(WCDBDetailData), [WCDBDetailData])
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
  return { data, columns }
}

export default useWCDBDetailTableData
