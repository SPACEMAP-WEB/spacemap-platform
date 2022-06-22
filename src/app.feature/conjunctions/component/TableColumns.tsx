import { Column } from 'react-table'
import { PPDBTableColumnType } from '@app.modules/types/conjunctions'

export const COLUMNS = ({
  queryParams,
  customPageSize,
  cesiumModule,
}): Column<PPDBTableColumnType>[] => [
  {
    Header: 'Index',
    accessor: (row) => {
      const page = queryParams.page
      return row.index + page * customPageSize
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
  {
    Header: 'View',
    accessor: (row) => {
      return (
        <img
          style={{
            width: '15px',
            cursor: 'pointer',
          }}
          // onClick={handleVisibility(cesiumModule)}
          onClick={() => {
            cesiumModule.drawConjunctions(row.primary, row.secondary, row.start, row.tca, row.end)
          }}
          // onClick={() => console.log(row)}
          src={'/svg/open-eye.svg'}
          alt="View"
        />
      )
    },
    enableRowSpan: true,
  },
]
