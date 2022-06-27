import { useQueryGetLPDB } from '@app.feature/launchConjunctions/query/useQueryLPDB'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import WarningModal from '@app.components/common/WarningModal'
import AssessmentModal from '../components/AssessmentModal'
import LPDBTable from '../components/LPDBTable'
import SuccessModal from '../components/SuccessModal'

const LaunchConjunctions = ({ cesiumModule }) => {
  const { isVisible, handleCloseModal } = useModal('LAUNCHCONJUNCTIONS')
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
        />
      )
    }
  }

  const handleCloseRequestLoginModal = () => {
    handleCloseModal()
  }

  return (
    <>
      {!login && isVisible && (
        <WarningModal
          handleRequestModalCancel={handleCloseRequestLoginModal}
          message={'Login first to use our service'}
        />
      )}
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <LaunchConjunctionsWrapper>{isVisible && renderModal()}</LaunchConjunctionsWrapper>
      )}
      {isSuccessModalOpen && <SuccessModal setIsSuccessModalOpen={setIsSuccessModalOpen} />}
    </>
  )
}

export default LaunchConjunctions

const LaunchConjunctionsWrapper = styled.div``
