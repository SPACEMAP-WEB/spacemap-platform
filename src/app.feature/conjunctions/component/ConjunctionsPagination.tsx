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
      {pageSize && (
        <select
          className="page-size-select"
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
          {[2, 3, 4, 5].map((pageSize) => (
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
  margin-top: 15px;
  button {
    background-color: rgba(149, 149, 149, 0.4);
    border: none;
    border-radius: 5px;
    color: #e2e2e2;
    :hover {
      cursor: pointer;
    }
  }
  .page-text {
    color: white;
    .page-count {
      color: #fccb16;
    }
  }
  .page-size-select {
    position: absolute;
    font-size: 12px;
    color: white;
    right: 0;
    width: 85px;
    padding: 2px 7px;
    background-color: rgba(149, 149, 149, 0.4);
    border: none;
    border-radius: 5px;
    color: #e2e2e2;
    :active {
      border: none;
    }
  }
`
