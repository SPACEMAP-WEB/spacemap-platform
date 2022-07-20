import { Input } from '@app.components/Input'
import ModalWrapper from '@app.components/modal/ModalWrapper'
import WarningModal from '@app.components/modal/WarningModal'
import { useModal } from '@app.modules/hooks/useModal'
import React, { useEffect, useRef, useState } from 'react'
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'
import styled from 'styled-components'
import { isCalculatableDate } from '@app.modules/util/calculatableDateHandler'
import { useMutationPostWCDB } from '../query/useMutationWCDB'
import { WCDBResponseType } from '../types/watcherCatcher'
import { InputErrorBox } from '@app.components/InputErrorBox'
import moment from 'moment'

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
  const [fieldOfViewValue, setFieldOfViewValue] = useState<number>(0)
  const [altitudeValue, setAltitudeValue] = useState<number>(0)
  const [epochtimeValue, setEpochtimeValue] = useState<string>(moment().toISOString())
  const [endtimeValue, setEndtimeValue] = useState<string>(moment().toISOString())
  const [isWatcherModalVisible, setIsWatcherModalVisible] = useState(false)
  const modalEl = useRef<HTMLDivElement>(null)
  const { mutate } = useMutationPostWCDB()

  useEffect(() => {
    setEndtimeValue(moment(epochtimeValue).add(1, 'hours').toISOString().substring(0, 16))
  }, [epochtimeValue])

  const handleInputValueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: 'latitude' | 'longitude' | 'epochtime' | 'endtime' | 'fieldOfView' | 'altitude'
  ) => {
    switch (inputType) {
      case 'longitude':
        setLongitudeValue(+e.target.value)
        break
      case 'latitude':
        setLatitudeValue(+e.target.value)
        break
      case 'fieldOfView':
        setFieldOfViewValue(+e.target.value)
        break
      case 'altitude':
        setAltitudeValue(+e.target.value)
        break
      case 'epochtime':
        setEpochtimeValue(e.target.value + ':00.000Z')
        break
      case 'endtime':
        setEndtimeValue(e.target.value + ':00.000Z')
        console.log(moment(endtimeValue).diff(epochtimeValue))
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
        epochTime: new Date(epochtimeValue).toUTCString(),
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

  const isSubmittable = () => {
    if (
      latitudeValue > 90 ||
      latitudeValue < -90 ||
      longitudeValue > 180 ||
      longitudeValue < -180 ||
      altitudeValue < 0
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <ModalWrapper visible={isVisible} modalEl={modalEl} handleCloseModal={handleCloseModal}>
        <Modal isSubmittable={isSubmittable()} ref={modalEl}>
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
              <section className="latitude-container">
                <div className="longitude-horizontal-box">
                  <p className="latitude-text">Latitude(km): </p>
                  <Input
                    type="number"
                    min={-90}
                    max={90}
                    value={latitudeValue}
                    onChange={(e) => handleInputValueChange(e, 'latitude')}
                    className="threshold-input"
                  ></Input>
                </div>
                {latitudeValue > 90 || latitudeValue < -90 ? (
                  <InputErrorBox>
                    <img src="svg/error-icon.svg" />
                    Latitude is limited from -90 to 90
                  </InputErrorBox>
                ) : null}
              </section>
              <section className="longitude-container">
                <div className="longitude-horizontal-box">
                  <p className="longitude-text">Longitude(km): </p>
                  <Input
                    type="number"
                    min={-180}
                    max={180}
                    value={longitudeValue}
                    onChange={(e) => handleInputValueChange(e, 'longitude')}
                    className="threshold-input"
                  ></Input>
                </div>
                {longitudeValue > 180 || longitudeValue < -180 ? (
                  <InputErrorBox>
                    <img src="svg/error-icon.svg" />
                    Longitude is limited from -180 to 180
                  </InputErrorBox>
                ) : null}
              </section>
              <section className="longitude-container">
                <div className="longitude-horizontal-box">
                  <p className="longitude-text">Altitude(km): </p>
                  <Input
                    type="number"
                    min={-180}
                    max={180}
                    value={altitudeValue}
                    onChange={(e) => handleInputValueChange(e, 'altitude')}
                    className="threshold-input"
                  ></Input>
                </div>
                {altitudeValue < 0 ? (
                  <InputErrorBox>
                    <img src="svg/error-icon.svg" />
                    Altitude must be positive number
                  </InputErrorBox>
                ) : null}
              </section>
              <section className="longitude-container">
                <div className="longitude-horizontal-box">
                  <p className="longitude-text">Field of View(°): </p>
                  <Input
                    type="number"
                    min={-180}
                    max={180}
                    value={fieldOfViewValue}
                    onChange={(e) => handleInputValueChange(e, 'fieldOfView')}
                    className="threshold-input"
                  ></Input>
                </div>
                {fieldOfViewValue > 90 || fieldOfViewValue < 0 ? (
                  <InputErrorBox>
                    <img src="svg/error-icon.svg" />
                    Field of View is limited from 0 to 90
                  </InputErrorBox>
                ) : null}
              </section>
              <section className="threshold-container">
                <p className="threshold-text">Epoch Time(UTC): </p>
                <Input
                  type="datetime-local"
                  value={epochtimeValue.substring(0, 16)}
                  onChange={(e) => handleInputValueChange(e, 'epochtime')}
                  className="threshold-input"
                ></Input>
              </section>
              <section className="threshold-container">
                <p className="threshold-text">End Time(UTC): </p>
                <Input
                  type="datetime-local"
                  value={endtimeValue.substring(0, 16)}
                  onChange={(e) => handleInputValueChange(e, 'epochtime')}
                  className="threshold-input"
                ></Input>
              </section>
              <button disabled={!isSubmittable()} className="submit-button" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </Modal>
      </ModalWrapper>
      {isWatcherModalVisible && (
        <WarningModal
          handleRequestModalCancel={handleClose}
          message={"It isn't open from 15:00 to 21:00."}
        />
      )}
    </>
  )
}

export default SearchModal

type ModalStyleProps = {
  isSubmittable: boolean
}

const Modal = styled.div<ModalStyleProps>`
  position: relative;
  width: 35rem;
  padding: 2rem;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(20px);
  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
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

    .longitude-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      .longitude-horizontal-box {
        display: flex;
        align-items: center;
        .longitude-text {
          width: 15rem;
          color: #c9c9c9;
        }
      }
    }
    .latitude-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      .longitude-horizontal-box {
        display: flex;
        align-items: center;
        .latitude-text {
          width: 15rem;
          color: #c9c9c9;
        }
      }
    }
    .threshold-container {
      display: flex;
      align-items: center;
      .threshold-text {
        width: 15rem;
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
      color: ${({ isSubmittable }) => (isSubmittable ? 'white' : '#a6a6a6')};
      z-index: 4;
      border-radius: 8px;
      transition: all 0.3s ease-in;
      &:hover {
        background-color: ${({ isSubmittable }) =>
          isSubmittable ? 'rgb(252, 203, 22)' : 'rgba(124, 124, 124, 0.4)d'};
        color: ${({ isSubmittable }) => (isSubmittable ? '#7a7a7a' : '#a6a6a6')};
      }
    }
  }
`
