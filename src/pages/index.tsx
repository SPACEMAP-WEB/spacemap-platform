import PageMain from './main'
import styled from 'styled-components'
import { useAppDispatch } from 'src/app.store/config/configureStore'
import { useEffect } from 'react'
import { setViewer } from 'src/app.store/cesium/store.cesium'
import { drawRsos } from 'src/app.store/cesium/cesiumReducer'
import moment from 'moment'

const AppIndex = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setViewer())
    const today = moment()
    // dispatch(drawRsos({ initialTime: today }))
  }, [])

  return (
    <>
      <PageMain />
      <StyledWrapper id="cesiumContainer"></StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  height: 100vh;
`

export default AppIndex
