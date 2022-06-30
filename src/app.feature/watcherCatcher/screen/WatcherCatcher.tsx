import WarningModal from '@app.components/modal/WarningModal'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import styled from 'styled-components'
import SearchModal from '../components/SearchModal'
import SuccessModal from '../components/SuccessModal'
import WCDBTable from '../components/WCDBTable'
import { useQueryGetWCDB } from '../query/useQueryWCDB'

const WatcherCatcher = ({ cesiumModule }) => {
  const { isVisible, handleCloseModal } = useModal('WATCHERCATCHER')
  const {
    user: { email },
    login,
  } = useSelector((state: RootState) => state.login)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false)
  const [isWCDBTableOpen, setIsWCDBTableOpen] = useState<boolean>(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

  const { isLoading, data: WCDBData, isSuccess, refetch: refetchWCDBData } = useQueryGetWCDB(email)

  const handleNewLaunchClick = () => {
    setIsSearchModalOpen(true)
  }

  const handleSearchModalClose = () => {
    handleCloseModal()
    setIsSearchModalOpen(false)
  }

  useEffect(() => {
    refetchWCDBData
  }, [isSearchModalOpen, isSuccessModalOpen])

  const renderModal = () => {
    if (WCDBData.data.length === 0 || isSearchModalOpen) {
      return (
        <SearchModal
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          setIsWCDBTableOpen={setIsWCDBTableOpen}
          handleSearchModalClose={handleSearchModalClose}
          refetchWCDBData={refetchWCDBData}
        />
      )
    } else if (WCDBData.data.length > 0 || isWCDBTableOpen) {
      refetchWCDBData()
      return (
        <WCDBTable
          WCDBData={WCDBData.data}
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
      {isSuccess && <WatcherCatcherWrapper>{isVisible && renderModal()}</WatcherCatcherWrapper>}
      {isSuccessModalOpen && <SuccessModal setIsSuccessModalOpen={setIsSuccessModalOpen} />}
    </>
  )
}

export default WatcherCatcher

const WatcherCatcherWrapper = styled.div``
