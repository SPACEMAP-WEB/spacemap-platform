import { useQueryGetLPDBDownload } from '@app.feature/launchConjunctions/query/useQueryLPDB'

const downloadHelper = async (filePath: string) => {
  const { refetch } = useQueryGetLPDBDownload(filePath)

  if (filePath) {
    const response = await refetch()
    const element = document.createElement('a')
    const textFile = new Blob([response.data.data], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(textFile)
    element.download = 'trajectory_result.txt'
    document.body.appendChild(element)
    element.click()
  } else {
    // console.log('Selected path is empty...')
  }
}

export default downloadHelper
