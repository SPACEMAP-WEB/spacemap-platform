import * as Cesium from 'cesium'

const CesiumComponent = () => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk'

  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.

  const viewer = new Cesium.Viewer('cesiumContainer', {
    // sceneMode: Cesium.SceneMode.SCENE3D,
    terrainProvider: Cesium.EllipsoidTerrainProvider(),

    // its for minimize...
    // skyBox: false,
    baseLayerPicker: true,
    geocoder: false,
    // scene3DOnly: true,
    skyBox: false,
    skyAtmosphere: false,
    selectionIndicator: false,
    requestRenderMode: true,
    maximumRenderTimeChange: 0.05,
  })

  return <></>
}

export default CesiumComponent
