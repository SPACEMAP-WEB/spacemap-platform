import { LPDBDataType } from '@app.modules/types/launchConjunctions'
import { useMemo } from 'react'
import { Column } from 'react-table'

const useLPDBDetailTableData = (LPDBDetailData: LPDBDataType[] | undefined) => {
  if (!!LPDBDetailData) return
  const data = useMemo(() => LPDBDetailData, [LPDBDetailData])
  const columns: Column<LPDBDataType>[] = useMemo(
    () => [
      {
        Header: 'Index',
        accessor: (row) => {
          return row.index
        },
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

export default useLPDBDetailTableData
