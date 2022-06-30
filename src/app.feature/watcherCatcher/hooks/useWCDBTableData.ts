import moment from 'moment'
import { useMemo } from 'react'
import { Column } from 'react-table'
import { WCDBResponseDataType } from '../types/watcherCatcher'

const useLPDBTableData = (WCDBData: WCDBResponseDataType[]) => {
  const data = useMemo(() => WCDBData, [WCDBData])
  const columns: Column<WCDBResponseDataType>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'email',
      },
      {
        Header: 'Type',
        accessor: () => 'WC',
      },
      {
        Header: 'Upload Date',
        accessor: (row) => moment.utc(row['createdAt']).format('MMM DD, YYYY HH:mm:ss'),
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        id: 'delete',
        Header: '',
      },
    ],
    []
  )
  return { data, columns }
}

export default useLPDBTableData
