import { useQueryGetCOLADB } from '@app.feature/collisionAvoidance/query/useQueryCOLADB'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import WarningModal from '@app.components/modal/WarningModal'
import AssessmentModal from '../components/AssessmentModal'
import COLADBTable from '../components/COLADBTable'
import SuccessModal from '../components/SuccessModal'

const CollisionAvoidance = () => {
  const { isVisible, handleCloseModal } = useModal('COLLISIONAVOIDANCE')
  const {
    user: { email },
    login,
  } = useSelector((state: RootState) => state.login)
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false)
  const [isCOLADBTableOpen, setIsCOLADBTableOpen] = useState<boolean>(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

  const {
    isLoading,
    data: COLADBData,
    isSuccess,
    refetch: refetchCOLADBData,
  } = useQueryGetCOLADB(email)

  const handleNewLaunchClick = () => {
    setIsAssessmentModalOpen(true)
  }

  const handleAssessmentModalClose = () => {
    handleCloseModal()
    setIsAssessmentModalOpen(false)
  }

  useEffect(() => {
    refetchCOLADBData
  }, [isAssessmentModalOpen, isSuccessModalOpen])

  const renderModal = () => {
    if (COLADBData.data.length === 0 || isAssessmentModalOpen) {
      return (
        <AssessmentModal
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          setIsCOLADBTableOpen={setIsCOLADBTableOpen}
          handleAssessmentModalClose={handleAssessmentModalClose}
          refetchCOLADBData={refetchCOLADBData}
        />
      )
    } else if (COLADBData.data.length > 0 || isCOLADBTableOpen) {
      refetchCOLADBData()
      return (
        <COLADBTable COLADBData={COLADBData.data} handleNewLaunchClick={handleNewLaunchClick} />
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
        <LaunchConjunctionsWrapper isVisible={isVisible}>
          {isVisible && renderModal()}
        </LaunchConjunctionsWrapper>
      )}
      {isSuccessModalOpen && <SuccessModal setIsSuccessModalOpen={setIsSuccessModalOpen} />}
    </>
  )
}

export default CollisionAvoidance

type LaunchConjunctionsProps = {
  isVisible: boolean
}

const LaunchConjunctionsWrapper = styled.div<LaunchConjunctionsProps>``
