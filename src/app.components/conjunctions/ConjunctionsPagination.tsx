import React from 'react'
import styled from 'styled-components'

const ConjunctionsPagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  pageCount,
  pageIndex,
  pageOptions,
  handlePage,
  setPageSize = null,
  pageSize = null,
  setCustomPageSize = null,
  setQueryParams = null,
  queryParams = null,
}) => {
  return (
    <PaginationWrapper>
      <button onClick={() => handlePage(() => gotoPage(0))} disabled={!canPreviousPage}>
        {'<<'}
      </button>
      <button onClick={() => handlePage(() => previousPage())} disabled={!canPreviousPage}>
        {'<'}
      </button>
      <strong className="page-text">
        <span className="page-count">{pageIndex + 1}</span> of {pageOptions.length}
      </strong>
      <button onClick={() => handlePage(() => nextPage())} disabled={!canNextPage}>
        {'>'}
      </button>
      <button onClick={() => handlePage(() => gotoPage(pageCount - 1))} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
      <span className="pagination-count">
        Page{' '}
        <strong>
          {pageIndex + 1} of {pageOptions.length}
        </strong>{' '}
      </span>
      <span>
        | Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            handlePage(() => gotoPage(page))
          }}
          style={{ width: '100px', marginRight: '5px' }}
        />
      </span>
      {pageSize && (
        <select
          value={pageSize}
          onChange={(e) => {
            const pageSize = Number(e.target.value)
            setQueryParams({
              ...queryParams,
              limit: pageSize,
            })
            setCustomPageSize(pageSize)
            setPageSize(pageSize)
          }}
        >
          {[5, 10].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      )}
    </PaginationWrapper>
  )
}

export default ConjunctionsPagination

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  gap: 10px;
  button {
    background-color: rgba(149, 149, 149, 0.4);
    border: none;
    border-radius: 5px;
    color: #e2e2e2;
  }
  .page-text {
    color: white;
    .page-count {
      color: #fccb16;
    }
  }
  .page-size-select {
    position: absolute;
    right: 0;
  }
`
