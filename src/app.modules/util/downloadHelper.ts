import { useQueryGetLPDBDownload } from '@app.feature/launchConjunctions/query/useQueryLPDB'
import { useState } from 'react'

const downloadHelper = async (filePath: string) => {
  const [selectedPath, setSelectedPath] = useState<string>('')
  const { data: downloadData, refetch } = useQueryGetLPDBDownload(selectedPath)

  setSelectedPath(filePath)
  if (selectedPath) {
    const response = await refetch()
    const element = document.createElement('a')
    const textFile = new Blob([response.data.data], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(textFile)
    element.download = 'trajectory_result.txt'
    document.body.appendChild(element)
    element.click()
    setSelectedPath('')
  } else {
    // console.log('Selected path is empty...')
  }
}

export default downloadHelper
