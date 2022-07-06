import { createSlice } from '@reduxjs/toolkit'
import * as Cesium from 'cesium'
import { updateCZML } from './cesiumModules'
import { drawRsos } from './cesiumReducer'

const initialState = {
  viewer: null,
  scene: null,
  czmlDataSource: null,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk',
  tles: null,
  rsoParams: null,
  satrecs: [],
  primarySatColor: Cesium.Color.GOLD,
  secondarySatColor: Cesium.Color.DARKORCHID,
  apartColor: Cesium.Color.GREEN,
  closeColor: Cesium.Color.RED,

  isPairMode: true,
  prevPid: null,
  prevSid: null,
  rocketBase64:
    'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAVOSURBVEhLtZZrUFRlGMeRy96XRQxEzAuolOgIOkIgrsoQloSNwgQpojKOt9IcGEEkb+A9LT9oJcHkrV11F1TWW4xOfqBPzTSUH2soEitrmkZWZBhn4d//eXd30kTjov+Z3+zZc97z/s/zvO/znBPwnBRCzD5EVwmMIVqYNToM4bH39LOTlohZOcFQnREjzeGIMIZiSuQotBUfAXbVK3MZ/CykIWPJCrPZjIkTJyI8Ogp7M99Gz46zwM56oJK/22z4jeYSubprkAokeUajEYmJidiyZQtE7e3tyF1WgE2p2eisOAlsP63MEyJHi+mgjcV0sUajQUlJiTJ8WG6aLyxchIq0+bgn5kxzlClMTL9Udw9Cy0NDQ1FVVeWzelxivmDJIpQzcg/THh0aLsb+TTcgraFpT01Njc/iyRLz3KUF2MM1D9MaBmVczE304MSJE+jo6MDm8nKUbliP4nfX4ozd5rN7VJ2dnYiNjfWv71ON48gO8gk5/BCHTCbTfbvdjq6uLixdWgiNOQxZFQeRuqIEU9Pnwnna7rN7VHFxcWIqpRZMepWUhiP35SRcyCuGbcFafFVYgbjwKGj0OjgcDvT09KgUhuiNWG9rxPF7QM2fwMrPryBxTibO19f57LyqrKyEXq8X4yjl0ItGkbqs8Qm4s7Ea2H0eOHQNuzIWIcISBmddHbq7u9Vk7XfvwjgsAsfcwJFW4OM24DOaz16zGWXFG9QYv5KTk8V0Jek12hHkXEbMJPxdVust+n0XsXVWDnQSaZ1TReqXGJtofLzDa3yYSOTZ7+/kmr/nGwVVasHBwWIsy/eYhpELaaMm4P7mY8COM8CeBlTNeQtanQ5nnQ7fNP/K7XbLZJiU/roylMjX2S6rc9u2blVjpNS0WtWp8shjCiWuqVFj2Na4MSTSPefxAdMbotPC4XSqSXpTc3OzMjINi2TaI3k8BMuXLVPXamtrYbFY5PpiMelNsuAIGhLosWgNHjZxjzEopHsob7p0+TIKCgrgcrnUZP+VpF7ao6Tdj+jUqVN+0yLl8BQFPYRoVUpKCn5ubUV+fj4aGhrUpvJvrKdJSk1eFpxjjXeqvkteb8P5yqmem56B72/eVBPGx8fj+vXr6vhJklJjnYtpsZqpH+J7OqCUaccXueuxb3Ye0qxW/NjSolLOa2hqavLZPCond72GG5FjpNH0W68RrJuRDRy4wnJyoTTpDVits9D2620UFhYq8xs3bvjsvOsspfYC63ycJWLAxvGkWTWQUjaQSpbR/ovYOH0eza3KvKioSNVlY2OjMj3LXS91vpdV4GKH4/0DMhalk2/nT0hE28ajLEaveVlSFtJmzkTrrVtYvXo1DAYDPq2upqke26w5wEfXYF/4zoCMpYkcJXvJi6RJzH8Rc4mcad/PNZcN1/JTC6Kjo6ENCsZONhm5ht3nYM8v6bdxGLGRv8g8MoVUkK+zxiXQnGk/cBW2nHUI1xmrU2ekdsWMGYMPM5ew2VxQTUfGyFjeU0n6JBOpI38QK5lO7CSJxJBv3oybhjJuuDB+OfL/cLLKrNX3SIeT9np7Uy0yYyZ387yDjCb/K6nZS0QifYVMJfVkEskh24mseTMR01Ii382B0uEk0jvs7dbRL3l4Th5+JOmTpE+7SSIRM/kQG09eJZ3kIBFNJtnEqP6xw4XqDB43P1mTo2Ml0nNEMtFnSYuU9YwlTUSeeDZ5QE4SA+lNQUGBgZ5pI8aKaQORjdlvyXv4OxJOUoik9Ax54icKJQ8sD+ciFjnRX0mqfyCSwgQiphJBXySplfsHpN+JP50ShZSVTv17bgoI+Aellw/uG+hW+QAAAABJRU5ErkJggg==',
}

export const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setViewer: (state) => {
      Cesium.Ion.defaultAccessToken = state.accessToken

      state.viewer = new Cesium.Viewer('cesiumContainer', {
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
      state.scene = state.viewer.scene
      state.scene.globe.enableLighting = true
      state.czmlDataSource = new Cesium.CzmlDataSource()
    },
  },
  extraReducers: (builder) => {
    builder.addCase(drawRsos.fulfilled, (state, { payload }) => {
      const { tles, rsoParams } = payload
      updateCZML({ ...payload, viewer: state.viewer, czmlDataSource: state.czmlDataSource })
      return { ...state, tles, rsoParams }
    })
  },
})

export const { setViewer } = viewerSlice.actions
