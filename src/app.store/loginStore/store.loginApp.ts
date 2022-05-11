import { createSlice } from '@reduxjs/toolkit'
import { requestCheckLogin, requestLogout } from './loginUser'

export type TUserData = {
  email: string
  provider: string
  nickname: string
}

type userType = {
  login: boolean
  isLoading: boolean
  error: boolean
  user: TUserData
}

const initialState: userType = {
  login: false,
  error: false,
  isLoading: true,
  user: {
    email: null,
    provider: null,
    nickname: null,
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(requestCheckLogin.fulfilled, (state, { payload }) => {
      console.log(payload)
      return { ...state, login: true, isLoading: false, error: false, user: { ...payload } }
    })
    builder.addCase(requestCheckLogin.rejected, (state) => {
      return {
        ...state,
        login: false,
        isLoading: false,
        error: true,
        user: { email: null, provider: null, nickname: null },
      }
    })
    builder.addCase(requestLogout.fulfilled, (state) => {
      return { ...state, login: false }
    })
    builder.addCase(requestLogout.rejected, (state) => {
      return { ...state, login: true, error: true }
    })
  },
})
