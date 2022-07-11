import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import MainLayout from '@app.components/MainLayout'

import { requestCheckLogin } from 'src/app.store/loginStore/loginUser'

const PageMain = ({ cesiumModule }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    dispatch(requestCheckLogin())
  }, [])

  if (isLoading) return null
  return (
    <>
      <MainLayout cesiumModule={cesiumModule} />
    </>
  )
}

export default PageMain
