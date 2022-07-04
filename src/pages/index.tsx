import PageMain from './main'
import styled from 'styled-components'
import CesiumModule from '@app.modules/cesium/cesiumModule'
import { useAppDispatch } from 'src/app.store/config/configureStore'
import { useEffect } from 'react'
import { setViewer } from 'src/app.store/cesium/store.cesium'
const cesiumModule = new CesiumModule()

const AppIndex = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setViewer())
  }, [])

  return (
    <>
      <PageMain cesiumModule={cesiumModule} />
      <StyledWrapper id="cesiumContainer"></StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  height: 100vh;
`

export default AppIndex
