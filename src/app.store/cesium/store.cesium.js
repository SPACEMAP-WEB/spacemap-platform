import { createSlice } from '@reduxjs/toolkit'
import * as Cesium from 'cesium'

const initialState = {
  viewer: null,
  accessToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk',
}

export const viewerSlice = createSlice({
  name: 'viewer',
  initialState,
  reducers: {
    setViewer: (state, option) => {
      Cesium.Ion.defaultAccessToken = state.accessToken
      state.viewer = new Cesium.Viewer('cesiumContainer', option)
    },
  },
})

export const { setViewer } = viewerSlice.actions
