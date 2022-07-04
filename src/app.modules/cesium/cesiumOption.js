export const cesiumOption = {
  imageryProvider: new Cesium.TileMapServiceImageryProvider({
    url: Cesium.buildModuleUrl('/cesium/Assets/Textures/NaturalEarthII'),
  }),
  geocoder: false,
  scene3DOnly: true,
  skyAtmosphere: false,
  selectionIndicator: false,
  homeButton: false,
  baseLayerPicker: false,
  navigationHelpButton: false,

  // for performance
  contextOptions: {
    webgl: {
      alpha: false,
      depth: true,
      stencil: false,
      antialias: false,
      powerPreference: 'high-performance',
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
    },
    allowTextureFilterAnisotropic: false,
    requestRenderMode: true,
  },

  maximumRenderTimeChange: 0.05,
  targetFrameRate: 30,

  automaticallyTrackDataSourceClocks: true,
  skyBox: new Cesium.SkyBox({
    sources: {
      positiveX: '/image/cesiumBackground/px.png',
      negativeX: '/image/cesiumBackground/nx.png',
      positiveY: '/image/cesiumBackground/py.png',
      negativeY: '/image/cesiumBackground/ny.png',
      positiveZ: '/image/cesiumBackground/pz.png',
      negativeZ: '/image/cesiumBackground/nz.png',
    },
  }),
}
