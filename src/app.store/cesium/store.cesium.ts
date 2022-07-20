import { createSlice, current } from '@reduxjs/toolkit'
import * as Cesium from 'cesium'
import { clean, fRsos, makePair, updateCZML } from './cesiumModules'
import { drawConjunctions, drawLcaConjunctions, drawRsos, drawWatchaCapture } from './cesiumReducer'
import { TdrawConjuctions, TdrawLcaConjuctions, TDrawWc, TStoreCesium } from './type'
import {
  drawCzmlOfConjuctions,
  drawCzmlOfLaunchConjuctions,
  drawCzmlOfWatchaCapture,
  drawPath,
} from '@app.modules/cesium/drawCzml'

const initialState: TStoreCesium = {
  viewer: null,
  scene: null,
  camera: null,
  czmlDataSource: null,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk',
  tles: null,
  rsoParams: null,
  initialTimeWindow: null,
  intervalUnitTime: null,
  duration: null,
  primarySatColor: Cesium.Color.GOLD,
  secondarySatColor: Cesium.Color.DARKORCHID,
  apartColor: Cesium.Color.GREEN,
  closeColor: Cesium.Color.RED,
  isPairMode: true,
  prevPid: null,
  prevSid: null,
  points: null,
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
        targetFrameRate: 60,

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

      const camera = viewer.camera
      const scene = viewer.scene
      scene.globe.enableLighting = true
      scene.debugShowFramesPerSecond = true
      scene.requestRenderMode = true
      const czmlDataSource = new Cesium.CzmlDataSource()
      const points = scene.primitives.add(new Cesium.PointPrimitiveCollection())
      return { ...state, viewer, camera, scene, czmlDataSource, points }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(drawRsos.fulfilled, (state, { payload }) => {
        const { tles, rsoParams } = payload
        const currentState = current(state)
        const { scene, points, viewer } = currentState
        // fRsos({ tles, rsoParams, scene, points, viewer })
        viewer.camera.flyHome()

        return { ...state, tles, rsoParams }
      })
      .addCase(drawConjunctions.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        // const worker = new Worker(new URL('./worker.ts', import.meta.url))
        const { tles, rsoParams, pid, sid, from, tca, to } = payload
        const { scene, points, viewer, primarySatColor, secondarySatColor } = currentState

        // clean({
        //   prevPid: payload.pid,
        //   prevSid: payload.sid,
        //   czmlDataSource: currentState.czmlDataSource,
        // })

        fRsos({ tles, rsoParams, scene, points, viewer })

        // drawPath({ pid, sid, from, tca, to, primarySatColor, secondarySatColor, viewer })

        // updateCZML<TdrawConjuctions>({
        //   initialTimeISOString: payload.tca,
        //   duration: 0,
        //   intervalUnitTime: 600,
        //   callback: drawCzmlOfConjuctions,
        //   ...currentState,
        //   ...payload,
        //   worker,
        // })
        return { ...currentState, tles, rsoParams }
      })
      .addCase(drawLcaConjunctions.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        // const worker = new Worker(new URL('./worker.ts', import.meta.url))
        const { tles, rsoParams, endInterval } = payload
        const { viewer, scene, points } = currentState
        fRsos({ tles, rsoParams, viewer, scene, points })

        // clean({ czmlDataSource: currentState.czmlDataSource })
        // updateCZML<TdrawLcaConjuctions>({
        //   callback: drawCzmlOfLaunchConjuctions,
        //   ...currentState,
        //   ...payload,
        //   initialTimeISOString: payload.launchEpochTime,
        //   worker,
        //   duration: endInterval,
        // })
        return { ...currentState, tles, rsoParams }
      })
      .addCase(drawWatchaCapture.fulfilled, (state, { payload }) => {
        const currentState = current(state)
        // const worker = new Worker(new URL('./worker.ts', import.meta.url))
        const { tles, rsoParams } = payload
        const { viewer, scene, points } = currentState
        fRsos({ tles, rsoParams, viewer, scene, points })
        // clean({ czmlDataSource: currentState.czmlDataSource })
        // updateCZML<TDrawWc>({
        //   callback: drawCzmlOfWatchaCapture,
        //   ...currentState,
        //   ...payload,
        //   initialTimeISOString: payload.epochTime,
        //   worker,
        //   duration: 3600,
        // })
        return { ...currentState, tles, rsoParams }
      })
  },
})

export const { setViewer } = viewerSlice.actions
