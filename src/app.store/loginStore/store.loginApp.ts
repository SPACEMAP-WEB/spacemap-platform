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
  reducers: {
    setAutoLogout: (state) => {
      state.login = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestCheckLogin.fulfilled, (state, { payload }) => {
        return { ...state, login: true, isLoading: false, error: false, user: { ...payload } }
      })
      .addCase(requestCheckLogin.rejected, (state) => {
        return {
          ...state,
          login: false,
          isLoading: false,
          error: true,
          user: { email: null, provider: null, nickname: null },
        }
      })
      .addCase(requestLogout.fulfilled, (state) => {
        return { ...state, login: false }
      })
      .addCase(requestLogout.rejected, (state) => {
        return { ...state, login: true, error: true }
      })
  },
})

export const { setAutoLogout } = userSlice.actions
