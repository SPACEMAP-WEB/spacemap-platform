import api from '@app.modules/api'
import { API_OAUTH, API_OAUTH_LOGOUT } from '@app.modules/keyFactory'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TUserData } from './store.loginApp'

type loginCheckResponse = {
  data: { login: string; data: TUserData }
}

export const requestCheckLogin = createAsyncThunk('LOGIN_CHECK', async () => {
  try {
    const res = await api.GET<string, loginCheckResponse>(API_OAUTH)
    return res.data.data
  } catch (error) {
    throw error
  }
})

export const requestLogout = createAsyncThunk('LOGOUT', async () => {
  try {
    await api.GET(API_OAUTH_LOGOUT)
  } catch (error) {
    throw error
  }
})
