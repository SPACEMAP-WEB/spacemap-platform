import { useQueryGetLPDB } from '@app.feature/launchConjunctions/query/useQueryLPDB'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useState } from 'react'
import styled from 'styled-components'
import AssessmentModal from './AssessmentModal'
import LPDBTable from './LPDBTable'

const LaunchConjunctions = ({ cesiumModule }) => {
  const { modalVisible, modalType, handleCloseModal } = useModal('LAUNCHCONJUNCTIONS')
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false)

  const { isLoading, data: LPDBData, isSuccess } = useQueryGetLPDB()

  const handleNewLaunchClick = () => {
    setIsAssessmentModalOpen(true)
  }

  const handleAssessmentModalClose = () => {
    handleCloseModal()
    setIsAssessmentModalOpen(false)
  }

  const renderModal = () => {
    if (LPDBData.data.length === 0 || isAssessmentModalOpen) {
      return <AssessmentModal handleAssessmentModalClose={handleAssessmentModalClose} />
    } else {
      return (
        <LPDBTable
          LPDBData={LPDBData.data}
          handleNewLaunchClick={handleNewLaunchClick}
          cesiumModule={cesiumModule}
        />
      )
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
