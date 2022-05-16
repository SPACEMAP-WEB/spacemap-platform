import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import ModalWrapper from '@app.components/common/ModalWrapper'
import { useModal } from '@app.modules/hooks/useModal'
import { useMutationPostLPDB } from './query/useMutationLPDB'

type AssessmentModalProps = {
  handleAssessmentModalClose: () => void
}

const AssessmentModal = ({ handleAssessmentModalClose }: AssessmentModalProps) => {
  const { modalVisible, handleCloseModal } = useModal('LAUNCHCONJUNCTIONS')
  const [thresholdValue, setThresholdValue] = useState<number>(0)
  const [inputFile, setInputFile] = useState<File>()
  const { mutate } = useMutationPostLPDB()

  const imageInput = useRef<HTMLInputElement>(null)
  const modalEl = useRef<HTMLDivElement>(null)

  const onCickImageUpload = () => {
    imageInput?.current.click()
  }

  const handleInputChange = (e) => {
    setThresholdValue(e.target.value)
  }

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setInputFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    console.log(inputFile)
    console.log(thresholdValue)
    mutate({ threshold: String(thresholdValue), trajectory: inputFile })
  }

  return (
    <ModalWrapper visible={modalVisible} modalEl={modalEl} handleCloseModal={handleCloseModal}>
      <Modal ref={modalEl}>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </section>
            <section className="file-input-container" onClick={onCickImageUpload}>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={imageInput}
                onChange={handleFileChange}
              />
              <img src="/svg/file.svg" className="add-file" />
              <p className="file-input-button">Upload File</p>
            </section>
            <section className="example-container">
              <p className="link-notice-text">
                Click
                <a href="https://www.google.com" target="_blank" className="link-text">
                  this link
                  <svg viewBox="0 0 70 36">
                    <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                  </svg>
                </a>
                to see Example!
              </p>
            </section>
            <section>
              <input
                type="number"
                value={thresholdValue}
                onChange={handleInputChange}
                className="threshold-input-container"
              ></input>
            </section>
            <button className="button-container" onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </Modal>
    </ModalWrapper>
  )
}

export default AssessmentModal

const Modal = styled.div`
  position: relative;
  background-color: white;
  width: 50rem;
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
    margin-bottom: 1rem;
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

    .example-container {
      .link-notice-text {
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
  }
`