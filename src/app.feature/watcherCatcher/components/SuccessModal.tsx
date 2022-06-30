import AlertModal from '@app.components/modal/SuccessModal'
import React from 'react'

type Props = {
  setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SuccessModal = ({ setIsSuccessModalOpen }: Props) => {
  return (
    <>
      <AlertModal setIsSuccessModalOpen={setIsSuccessModalOpen} />
    </>
  )
}

export default SuccessModal
