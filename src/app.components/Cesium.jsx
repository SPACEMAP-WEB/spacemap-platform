import * as Cesium from 'cesium'
import { useEffect } from 'react'
import styled from 'styled-components'
import CesiumModule from '@app.modules/cesium/cesiumModule'
import moment from 'moment'

const CesiumComponent = ({ cesiumModule }) => {
  const today = moment().add(-1, 'days')
  cesiumModule.initiailize(today.year(), today.month() + 1, today.date(), 0);
  return <></>
}

export default CesiumComponent

const StyledWrapper = styled.div`
  height: 100vh;
`
