import PageMain from './main'
import dynamic from 'next/dynamic'
import styled from 'styled-components'
// console.log('called?')
import CesiumModule from '@app.modules/cesium/cesiumModule'
const cesiumModule = new CesiumModule()
const CesiumComponent = dynamic(() => import('@app.components/Cesium'), {
  ssr: false,
})

const AppIndex = () => (
  <>
    <PageMain cesiumModule={cesiumModule} />
    <CesiumComponent cesiumModule={cesiumModule} />
    <StyledWrapper id="cesiumContainer"></StyledWrapper>
  </>
)

const StyledWrapper = styled.div`
  height: 100vh;
`

export default AppIndex
