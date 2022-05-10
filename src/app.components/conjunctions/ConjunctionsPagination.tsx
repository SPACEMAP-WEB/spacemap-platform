import React from 'react'

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
}) => {
  return (
    <div className="pagination">
      <button onClick={() => handlePage(() => gotoPage(0))} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => handlePage(() => previousPage())} disabled={!canPreviousPage}>
        {'<'}
      </button>{' '}
      <button onClick={() => handlePage(() => nextPage())} disabled={!canNextPage}>
        {'>'}
      </button>{' '}
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
          style={{ width: '100px' }}
        />
      </span>
    </div>
  )
}

export default ConjunctionsPagination
