import { COLADBDataType } from '@app.feature/collisionAvoidance/types/collisionAvoidance'
import { useMemo } from 'react'
import { Column } from 'react-table'

const useCOLADBDetailTableData = (COLADBDetailData: COLADBDataType[] | undefined) => {
  if (!!COLADBDetailData) return
  const data = useMemo(() => COLADBDetailData, [COLADBDetailData])
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
  return { data, columns }
}

export default useCOLADBDetailTableData
