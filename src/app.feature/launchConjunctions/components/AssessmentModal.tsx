import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ModalWrapper from '@app.components/modal/ModalWrapper'
import { useModal } from '@app.modules/hooks/useModal'

import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query'
import { LPDBResponseType } from '@app.feature/launchConjunctions/types/launchConjunctions'
import { useMutationPostLPDB } from '../query/useMutationLPDB'
import WarningModal from '@app.components/modal/WarningModal'
import { PrimaryButton } from '@app.components/button/Button'
import { useQueryGetLPDBSampleDownload } from '../query/useQueryLPDB'

type AssessmentModalProps = {
  handleAssessmentModalClose: () => void
  setIsLPDBTableOpen: React.Dispatch<React.SetStateAction<boolean>>
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  refetchLPDBData: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<LPDBResponseType, unknown>>
}

type ModalStyleProps = {
  isSubmitDisabled: boolean
}

const AssessmentModal = ({
  handleAssessmentModalClose,
  setIsSuccessModalOpen,
  setIsLPDBTableOpen,
}: AssessmentModalProps) => {
  const { isVisible, handleCloseModal, handleSetModal } = useModal('LAUNCHCONJUNCTIONS')
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true)
  const [thresholdValue, setThresholdValue] = useState<number | null>(null)
  const [inputFile, setInputFile] = useState<File>()
  const [fileName, setFileName] = useState<string>('')
  const { mutate } = useMutationPostLPDB()
  const [isLcaModalVisible, setIsLcaModalVisible] = useState(false)
  const { refetch } = useQueryGetLPDBSampleDownload()

  const fileInput = useRef<HTMLInputElement>(null)
  const modalEl = useRef<HTMLDivElement>(null)

  const onCickFileUpload = () => {
    fileInput?.current.click()
  }

  const handleThresholdInputChange = (e) => {
    setThresholdValue(e.target.value)
  }

  const handleFileChange = (e) => {
    setInputFile(e.target.files[0])
    setFileName(e.target.files[0]?.name)
    if (!!e.target.files.length) {
      setIsSubmitDisabled(false)
    }
  }

  const handleSubmit = () => {
    try {
      mutate(
        { threshold: String(thresholdValue), trajectory: inputFile },
        {
          onSuccess: async (data) => {
            console.log(data)
          },
        }
      )
      console.log('hi')
      setIsSuccessModalOpen(true)
      setIsLPDBTableOpen(true)
      handleAssessmentModalClose()
      handleSetModal()
    } catch (error) {
      console.error(error)
    }
  }

  const handleClose = () => {
    setIsLcaModalVisible(false)
  }

  const handleDownload = async () => {
    const response = await refetch()
    const element = document.createElement('a')
    const textFile = new Blob([response.data.data], {
      type: 'text/plain',
    })
    element.href = URL.createObjectURL(textFile)
    element.download = 'bocachica_J2000_converted.txt'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <>
      <ModalWrapper visible={isVisible} modalEl={modalEl} handleCloseModal={handleCloseModal}>
        <Modal ref={modalEl} isSubmitDisabled={isSubmitDisabled}>
          <div className="modal-content-container">
            <header className="modal-header">
              <h1 className="modal-title">Launch Conjunctions Assessment</h1>
              <img
                src="/svg/close-white.svg"
                className="modal-close"
                onClick={handleAssessmentModalClose}
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  alignItems: 'center',
                }}
              >
                <section className="file-input-container" onClick={onCickFileUpload}>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept="text/plain"
                  />
                  <img src="/svg/file.svg" className="add-file" />
                  <p className="file-input-button">Upload File</p>
                </section>
                <p className="file-text">{fileName}</p>
              </div>
              <section className="threshold-container">
                <p className="threshold-text">Threshold(km): </p>
                <input
                  type="number"
                  value={thresholdValue || ''}
                  onChange={handleThresholdInputChange}
                  className="threshold-input"
                ></input>
              </section>
              <section className="example-container">
                <p className="link-notice-text">
                  Click
                  <a onClick={() => handleDownload()} className="link-text">
                    this link
                    <svg viewBox="0 0 70 36">
                      <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                    </svg>
                  </a>
                  to download a sample file containing launch trajectory. (Note: The trajectory is
                  currently a time-ordered coordinates sampled at 1 Hz frequency. The conversion to
                  and from a corresponding ephemeris is straightforward.)
                </p>
              </section>
              <PrimaryButton onClick={handleSubmit} isDisabled={isSubmitDisabled}>
                Submit
              </PrimaryButton>
            </div>
          </div>
        </Modal>
      </ModalWrapper>
      {isLcaModalVisible && (
        <WarningModal
          handleRequestModalCancel={handleClose}
          message={"It isn't open from 15:00 to 21:00."}
        />
      )}
    </>
  )
}

export default AssessmentModal

const Modal = styled.div<ModalStyleProps>`
  position: relative;
  width: 45rem;
  height: 40rem;
  padding: 1rem;
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
    gap: 3rem;
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
    .threshold-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      .threshold-text {
        color: #c9c9c9;
      }
      .threshold-input {
        border: none;
        border-radius: 5px;
        width: 100%;
        height: 30px;
        background-color: rgba(149, 149, 149, 0.4);
        color: rgba(255, 255, 255, 0.8);
        font-size: 15px;
        padding: 7px;
      }
    }
  }
`
