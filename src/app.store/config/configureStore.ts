import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { userSlice } from '../loginStore/store.loginApp'
import { modalSlice } from '../modalStore/store.modalApp'
import { viewerSlice } from '../cesium/store.cesium'
import { timeFormatSlice } from '../timeFormatStore/store.timeFormatApp'

export const store = configureStore({
  reducer: {
    viewer: viewerSlice.reducer,
    login: userSlice.reducer,
    modal: modalSlice.reducer,
    timeFormat: timeFormatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
