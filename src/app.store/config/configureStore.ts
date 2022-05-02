import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '../loginStore/store.loginApp'
import { modalSlice } from '../modalStore/store.modalApp'

export const store = configureStore({
  reducer: {
    login: userSlice.reducer,
    modal: modalSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
