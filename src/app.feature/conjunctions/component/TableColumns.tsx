import { Column } from 'react-table'
import { PPDBDataType, PPDBSearchParamsType } from '@app.feature/conjunctions/types/conjunctions'
import { drawConjuctions } from 'src/app.store/cesium/cesiumReducer'

type ColumnProps = {
  queryParams: PPDBSearchParamsType
  customPageSize: number
  dispatch
}

export const COLUMNS = ({
  queryParams,
  customPageSize,
  dispatch,
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
            dispatch(drawConjuctions({ ...rowObj }))
          }}
          src={'/svg/open-eye.svg'}
          alt="View"
        />
      )
    },
  },
]
