import { Column } from 'react-table'
import { PPDBDataType, PPDBSearchParamsType } from '@app.modules/types/conjunctions'

type ColumnProps = {
  queryParams: PPDBSearchParamsType
  customPageSize: number
  cesiumModule
}

export const COLUMNS = ({
  queryParams,
  customPageSize,
  cesiumModule,
}: ColumnProps): Column<PPDBDataType>[] => [
  {
    Header: 'Index',
    accessor: (row) => {
      const page = queryParams.page
      return row.index + page * customPageSize
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
  {
    Header: 'View',
    accessor: (row) => {
      return (
        <img
          style={{
            width: '15px',
            cursor: 'pointer',
          }}
          onClick={() => {
            cesiumModule.drawConjunctions(row.primary, row.secondary, row.start, row.tca, row.end)
          }}
          src={'/svg/open-eye.svg'}
          alt="View"
        />
      )
    },
  },
]
