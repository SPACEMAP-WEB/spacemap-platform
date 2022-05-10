import MainLayout from '@app.components/common/MainLayout'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { requestCheckLogin } from 'src/app.store/loginStore/loginUser'

const CesiumComponent = dynamic(() => import('@app.components/Cesium'), {
  ssr: false,
})

const PageMain = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state: RootState) => state.login)

  useEffect(() => {
    dispatch(requestCheckLogin())
  }, [])

  if (isLoading) return null

  return (
    <>
      <Head>
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.84/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        ></link>
      </Head>
      <MainLayout />
      <CesiumComponent />
    </>
  )
}

export default PageMain
