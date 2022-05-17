import MainLayout from '@app.components/common/MainLayout'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/app.store/config/configureStore'
import { requestCheckLogin } from 'src/app.store/loginStore/loginUser'
import CesiumModule from '@app.modules/cesium/cesiumModule'

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
  const cesiumModule = new CesiumModule()
  return (
    <>
      <Head>
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.84/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        ></link>
      </Head>
      <MainLayout cesiumModule={cesiumModule} />
      <CesiumComponent cesiumModule={cesiumModule} />
      <StyledWrapper id="cesiumContainer"></StyledWrapper>
    </>
  )
}

export default PageMain

const StyledWrapper = styled.div`
  height: 100vh;
`
