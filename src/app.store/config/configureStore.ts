import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { userSlice } from '../loginStore/store.loginApp'
import { modalSlice } from '../modalStore/store.modalApp'
import { viewerSlice } from '../cesium/store.cesium'

export const store = configureStore({
  reducer: {
    login: userSlice.reducer,
    modal: modalSlice.reducer,
    viewer: viewerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
