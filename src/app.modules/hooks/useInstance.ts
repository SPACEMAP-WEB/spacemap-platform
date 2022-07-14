export const useInstance = (instance) => {
  const { allColumns } = instance

  let rowSpanHeaders = []

  allColumns.forEach((column, i) => {
    const { id, enableRowSpan } = column

    if (enableRowSpan !== undefined) {
      rowSpanHeaders = [...rowSpanHeaders, { id, topCellValue: null, topCellIndex: 0 }]
    }
  })

  Object.assign(instance, { rowSpanHeaders })
}
