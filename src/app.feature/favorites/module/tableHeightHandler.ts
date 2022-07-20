export type SizeType = 2 | 3 | 4 | 5

const tableHeightHandler = (size: SizeType) => {
  switch (size) {
    case 2:
      return '300px'
    case 3:
      return '400px'
    case 4:
      return '500px'
    case 5:
      return '600px'
  }
}

export default tableHeightHandler
