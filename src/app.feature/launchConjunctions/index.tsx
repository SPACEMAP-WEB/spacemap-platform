import { useQueryGetLPDB } from '@app.feature/launchConjunctions/query/useQueryLPDB'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import AssessmentModal from './AssessmentModal'
import LPDBTable from './LPDBTable'
import SuccessModal from './SuccessModal'
import WarningModal from '@app.components/common/WarningModal'

const LaunchConjunctions = ({ cesiumModule }) => {
  const { modalVisible, modalType, handleCloseModal } = useModal('LAUNCHCONJUNCTIONS')
  const {
    user: { email },
    login,
  } = useSelector((state: RootState) => state.login)
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false)
  const [isLPDBTableOpen, setIsLPDBTableOpen] = useState<boolean>(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

  const { isLoading, data: LPDBData, isSuccess, refetch: refetchLPDBData } = useQueryGetLPDB(email)

  const handleNewLaunchClick = () => {
    setIsAssessmentModalOpen(true)
  }

  const handleAssessmentModalClose = () => {
    handleCloseModal()
    setIsAssessmentModalOpen(false)
  }

  useEffect(() => {
    refetchLPDBData
  }, [isAssessmentModalOpen, isSuccessModalOpen])

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
          refetchLPDBData={refetchLPDBData}
        />
      )
    }
  }

  const handleCloseRequestLoginModal = () => {
    handleCloseModal()
  }

  if (!login && modalVisible && modalType === 'LAUNCHCONJUNCTIONS')
    return (
      <WarningModal
        handleRequestModalCancel={handleCloseRequestLoginModal}
        message={'Login first to use our service'}
      />
    )

  return (
    <>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <LaunchConjunctionsWrapper>
          {modalType === 'LAUNCHCONJUNCTIONS' && modalVisible && renderModal()}
        </LaunchConjunctionsWrapper>
      )}
      {isSuccessModalOpen && <SuccessModal setIsSuccessModalOpen={setIsSuccessModalOpen} />}
    </>
  )
}

export default LaunchConjunctions

const LaunchConjunctionsWrapper = styled.div``
