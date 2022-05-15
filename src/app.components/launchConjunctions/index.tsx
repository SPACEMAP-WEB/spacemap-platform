import { useQueryGetLPDB } from '@app.feature/conjunctions/query/useQueryLPDB'
import { useModal } from '@app.modules/hooks/useModal'
import React from 'react'
import styled from 'styled-components'
import AssessmentModal from './AssessmentModal'
import LPDBTable from './LPDBTable'

const LaunchConjunctions = () => {
  const { modalVisible, modalType } = useModal('LAUNCHCONJUNCTIONS')

  const { isLoading, data: LPDBData, isSuccess } = useQueryGetLPDB()

  const renderModal = () => {
    if (LPDBData.data.length === 0) {
      return <AssessmentModal />
    } else {
      return <LPDBTable LPDBData={LPDBData.data} />
    }
  }

  return (
    <>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <LaunchConjunctionsWrapper>
          {modalType === 'LAUNCHCONJUNCTIONS' && modalVisible && renderModal()}
        </LaunchConjunctionsWrapper>
      )}
    </>
  )
}

export default LaunchConjunctions

const LaunchConjunctionsWrapper = styled.div``
