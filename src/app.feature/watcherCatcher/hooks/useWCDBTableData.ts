import { LPDBResponseDataType } from '@app.feature/launchConjunctions/types/launchConjunctions'
import moment from 'moment'
import { useMemo } from 'react'
import { CellProps, Column } from 'react-table'

const useLPDBTableData = (LPDBData: LPDBResponseDataType[]) => {
  const data = useMemo(() => LPDBData, [LPDBData])
  const columns: Column<LPDBResponseDataType>[] = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'email',
      },
      {
        Header: 'Type',
        accessor: (row) => 'LCA',
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
