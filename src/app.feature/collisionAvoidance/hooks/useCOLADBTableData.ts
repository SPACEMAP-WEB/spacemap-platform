import { COLADBResponseDataType } from '@app.feature/collisionAvoidance/types/collisionAvoidance'
import moment from 'moment'
import { useMemo } from 'react'
import { Column } from 'react-table'

const useCOLADBTableData = (COLADBData: COLADBResponseDataType[]) => {
  const data = useMemo(() => COLADBData, [COLADBData])
  const columns: Column<COLADBResponseDataType>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'email',
      },
      {
        Header: 'Type',
        accessor: (row) => 'COLA',
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

export default useCOLADBTableData
