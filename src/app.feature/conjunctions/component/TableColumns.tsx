import { Column } from 'react-table'
import { PPDBDataType, PPDBSearchParamsType } from '@app.feature/conjunctions/types/conjunctions'

type ColumnProps = {
  queryParams: PPDBSearchParamsType
  customPageSize: number
  viewConjunctions: (any) => void
}

export const COLUMNS = ({
  queryParams,
  customPageSize,
  viewConjunctions,
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
      const rowObj = {
        pid: row.primary,
        sid: row.secondary,
        from: row.start,
        tca: row.tca,
        to: row.end,
      }
      return (
        <img
          style={{
            width: '15px',
            cursor: 'pointer',
          }}
          onClick={() => {
            viewConjunctions(rowObj)
          }}
          src={'/svg/open-eye.svg'}
          alt="View"
        />
      )
    },
  },
]
