import * as Cesium from 'cesium'
import { useEffect } from 'react'
import styled from 'styled-components'
import CesiumModule from '@app.modules/cesium/cesiumModule'
import moment from 'moment'

const CesiumComponent = ({cesiumModule}) => {
  const today = moment().add(-1,'days');
  cesiumModule.initiailize(today.year(), today.month() + 1, today.date(), 0);
  console.log(cesiumModule.getViewer());

  // cesiumModule.cesiumModule.initialize();
  // cesiumModule.initiailze();
  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  // Cesium.Ion.defaultAccessToken =
  // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk'

  // new Cesium.Viewer('cesiumContainer', {
  //   // sceneMode: Cesium.SceneMode.SCENE3D,
  //   terrainProvider: Cesium.EllipsoidTerrainProvider(),

  //   // its for minimize...
  //   // skyBox: false,
  //   baseLayerPicker: true,
  //   geocoder: false,
  //   scene3DOnly: true,
  //   skyAtmosphere: false,
  //   selectionIndicator: false,
  //   requestRenderMode: true,
  //   maximumRenderTimeChange: 0.05,
  //   homeButton: false,
  //   baseLayerPicker: false,
  //   navigationHelpButton: false,
  // })

  // return <StyledWrapper id="cesiumContainer" />
  return <></>
}

export default CesiumComponent

const StyledWrapper = styled.div`
  height: 100vh;
`
