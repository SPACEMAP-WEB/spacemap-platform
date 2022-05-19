import { useQueryGetLPDB } from '@app.feature/launchConjunctions/query/useQueryLPDB'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useState } from 'react'
import styled from 'styled-components'
import AssessmentModal from './AssessmentModal'
import LPDBTable from './LPDBTable'
import SuccessModal from './SuccessModal'

const LaunchConjunctions = ({ cesiumModule }) => {
  const { modalVisible, modalType, handleCloseModal } = useModal('LAUNCHCONJUNCTIONS')
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false)
  const [isLPDBTableOpen, setIsLPDBTableOpen] = useState<boolean>(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

  const { isLoading, data: LPDBData, isSuccess, refetch: refetchLPDBData } = useQueryGetLPDB()

  const handleNewLaunchClick = () => {
    setIsAssessmentModalOpen(true)
  }

  const handleAssessmentModalClose = () => {
    handleCloseModal()
    setIsAssessmentModalOpen(false)
  }

  const renderModal = () => {
    if (LPDBData.data.length === 0 || isAssessmentModalOpen) {
      return (
        <AssessmentModal
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          setIsLPDBTableOpen={setIsLPDBTableOpen}
          handleAssessmentModalClose={handleAssessmentModalClose}
          refetchLPDBData={refetchLPDBData}
        />
      )
    } else if (LPDBData.data.length > 0 || isLPDBTableOpen) {
      refetchLPDBData()
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
      {isSuccessModalOpen && <SuccessModal />}
    </>
  )
}

export default LaunchConjunctions

const LaunchConjunctionsWrapper = styled.div``
