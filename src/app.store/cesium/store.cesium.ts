import {
  drawCzmlOfConjuctions,
  drawCzmlOfLaunchConjuctions,
  drawCzmlOfRsos,
  drawCzmlOfWatchaCapture,
} from '@app.modules/cesium/drawCzml'
import { createSlice, current } from '@reduxjs/toolkit'
import * as Cesium from 'cesium'
import { clean, updateCZML } from './cesiumModules'
import { drawConjuctions, drawLcaConjuctions, drawRsos, drawWatchaCapture } from './cesiumReducer'
import { TStoreCesium } from './type'

const initialState: TStoreCesium = {
  viewer: new Cesium.Viewer('cesiumContainer', {
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
  }),
  scene: null,
  czmlDataSource: null,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk',
  tles: null,
  rsoParams: null,
  primarySatColor: Cesium.Color.GOLD,
  secondarySatColor: Cesium.Color.DARKORCHID,
  apartColor: Cesium.Color.GREEN,
  closeColor: Cesium.Color.RED,

  isPairMode: true,
  prevPid: null,
  prevSid: null,
}

export const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setViewer: (state) => {
      Cesium.Ion.defaultAccessToken = state.accessToken
      const viewer = new Cesium.Viewer('cesiumContainer', {
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
      })

      const scene = viewer.scene
      scene.globe.enableLighting = true
      return { ...state, viewer, scene: scene, czmlDataSource: new Cesium.CzmlDataSource() }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(drawRsos.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        const { tles, rsoParams } = payload
        updateCZML({ callback: drawCzmlOfRsos, ...state, ...payload })
        return { ...currentState, tles, rsoParams }
      })
      .addCase(drawConjuctions.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        const { tles, rsoParams } = payload
        clean({
          prevPid: payload.pid,
          prevSid: payload.sid,
          czmlDataSource: currentState.czmlDataSource,
        })
        updateCZML({
          initialTimeISOString: payload.tca,
          duration: 0,
          intervalUnitTime: 600,
          callback: drawCzmlOfConjuctions,
          ...currentState,
          ...payload,
        })
        return { ...currentState, tles, rsoParams }
      })
      .addCase(drawLcaConjuctions.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        const { tles, rsoParams } = payload
        clean({ czmlDataSource: currentState.czmlDataSource })
        updateCZML({
          callback: drawCzmlOfLaunchConjuctions,
          ...currentState,
          ...payload,
          initialTimeISOString: payload.predictionEpochTime,
        })
        return { ...currentState, tles, rsoParams }
      })
      .addCase(drawWatchaCapture.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        const { tles, rsoParams } = payload
        clean({ czmlDataSource: currentState.czmlDataSource })
        updateCZML({
          callback: drawCzmlOfWatchaCapture,
          ...currentState,
          ...payload,
          initialTimeISOString: payload.epochTime,
        })
        return { ...currentState, tles, rsoParams }
      })
  },
})

export const { setViewer } = viewerSlice.actions
