import { Input } from '@app.components/Input'
import ModalWrapper from '@app.components/modal/ModalWrapper'
import WarningModal from '@app.components/modal/WarningModal'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useRef, useState } from 'react'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'
import styled from 'styled-components'
import { isCalculatableDate } from '../module/dateHandle'
import { useMutationPostWCDB } from '../query/useMutationWCDB'
import { WCDBResponseType } from '../types/watcherCatcher'

type SearchModalProps = {
  handleSearchModalClose: () => void
  setIsWCDBTableOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetchWCDBData: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<WCDBResponseType, unknown>>
}

const SearchModal = ({
  handleSearchModalClose,
  setIsSuccessModalOpen,
  setIsWCDBTableOpen,
}: SearchModalProps) => {
  const { isVisible, handleCloseModal, handleSetModal } = useModal('WATCHERCATCHER')
  const [latitudeValue, setLatitudeValue] = useState<number>(0)
  const [longitudeValue, setLongitudeValue] = useState<number>(0)
  const [epochtimeValue, setEpochtimeValue] = useState<string>(
    new Date().toISOString().substring(0, 16)
  )
  const [isWatcherModalVisible, setIsWatcherModalVisible] = useState(false)
  const modalEl = useRef<HTMLDivElement>(null)
  const { mutate } = useMutationPostWCDB()

  const handleInputValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: 'latitude' | 'longitude' | 'epochtime'
  ) => {
    switch (inputType) {
      case 'longitude':
        setLongitudeValue(+e.target.value)
        break
      case 'latitude':
        setLatitudeValue(+e.target.value)
        break
      case 'epochtime':
        setEpochtimeValue(e.target.value)
        console.log(e.target.value)
        break
    }
  }

  const handleSubmit = () => {
    try {
      if (!isCalculatableDate()) {
        setIsWatcherModalVisible(true)
        return
      }
      setIsSuccessModalOpen(true)
      mutate({
        longitude: longitudeValue,
        latitude: latitudeValue,
        epochTime: new Date(epochtimeValue),
      })
      setIsWCDBTableOpen(true)
      handleSearchModalClose()
      handleSetModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    setIsWatcherModalVisible(false)
  }

  return (
    <>
      <ModalWrapper visible={isVisible} modalEl={modalEl} handleCloseModal={handleCloseModal}>
        <Modal ref={modalEl}>
          <div className="modal-content-container">
            <header className="modal-header">
              <h1 className="modal-title">Watcher Catcher</h1>
              <img
                src="/svg/close-white.svg"
                className="modal-close"
                onClick={handleSearchModalClose}
              />
            </header>
            <div className="body-container">
              <section className="description-container">
                <p className="description-text">
                  Reports all RSOs within the "Threshold" from the launch vehicle which follows the
                  "Launch Trajectory.“ Choose a file using the Upload File button. For an example
                  file, see below.
                </p>
              </section>
              <section className="latitude-container">
                <p className="latitude-text">latitude: </p>
                <Input
                  type="number"
                  value={latitudeValue}
                  onChange={(e) => handleInputValueChange(e, 'latitude')}
                  className="threshold-input"
                ></Input>
              </section>
              <section className="longitude-container">
                <p className="longitude-text">longitude: </p>
                <Input
                  type="number"
                  value={longitudeValue}
                  onChange={(e) => handleInputValueChange(e, 'longitude')}
                  className="threshold-input"
                ></Input>
              </section>
              <section className="threshold-container">
                <p className="threshold-text">Epoch Time: </p>
                <Input
                  type="datetime-local"
                  value={epochtimeValue}
                  onChange={(e) => handleInputValueChange(e, 'epochtime')}
                  className="threshold-input"
                ></Input>
              </section>
              <button className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </ModalWrapper>
      {isWatcherModalVisible && (
        <WarningModal
          handleRequestModalCancel={handleClose}
          message={"It isn't open from 12:00 to 18:00."}
        />
      )}
    </>
  )
}

export default SearchModal

const Modal = styled.div`
  position: relative;
  width: 32rem;
  height: 32rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
    & > img {
      width: 30px;
      height: 30px;
      margin-right: 5px;
      cursor: pointer;
    }
    & > h1 {
      font-size: 1.2rem;
      color: #c9c9c9;
    }
  }

  .body-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    height: 70%;
    .description {
      &-container {
        max-width: 500px;
      }
      &-text {
        color: #c9c9c9;
      }
    }

    .file-input {
      &-container {
        width: 200px;
        height: 50px;
        background-color: rgba(255, 255, 255, 0.13);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(20px);
        gap: 0.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        :hover {
          background-color: rgba(255, 255, 255, 0.18);
        }
        & > .add-file {
          width: 1rem;
        }
      }
      &-button {
        color: #c9c9c9;
      }
    }

    .file-text {
      color: #c9c9c9;
    }

    .example-container {
      .link-notice-text {
        max-width: 500px;
        font-size: 18px;
        margin: 0;
        color: #c9c9c9;
        .link-text {
          display: inline-block;
          position: relative;
          text-decoration: none;
          color: inherit;
          margin: 0 6px;
          transition: margin 0.25s;
          svg {
            width: 200px;
            height: 40px;
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 7px) translateZ(0);
            fill: none;
            stroke: var(--stroke, #eae3c6);
            stroke-linecap: round;
            stroke-width: 2px;
            stroke-dasharray: var(--offset, 69px) 278px;
            stroke-dashoffset: 361px;
            transition: stroke 0.25s ease var(--stroke-delay, 0s), stroke-dasharray 0.35s;
          }
          &:hover {
            margin: 0 10px;
            --spacing: 10px;
            --stroke: #fccb16;
            --stroke-delay: 0.1s;
            --offset: 180px;
          }
        }
      }
    }

    .longitude-container {
      display: flex;
      align-items: center;
      .longitude-text {
        width: 10rem;
        color: #c9c9c9;
      }
    }
    .latitude-container {
      display: flex;
      align-items: center;
      .latitude-text {
        width: 10rem;
        color: #c9c9c9;
      }
    }
    .threshold-container {
      display: flex;
      align-items: center;
      .threshold-text {
        width: 10rem;
        color: #c9c9c9;
      }
    }

    .submit-button {
      margin-top: 2rem;
      width: 120px;
      height: 40px;
      font-size: 1rem;
      cursor: pointer;
      background-color: rgba(124, 124, 124, 0.4);
      color: white;
      z-index: 4;
      border-radius: 8px;
      transition: all 0.3s ease-in;
      &:hover {
        background-color: rgb(252, 203, 22);
        color: #7a7a7a;
      }
    }
  }
`
