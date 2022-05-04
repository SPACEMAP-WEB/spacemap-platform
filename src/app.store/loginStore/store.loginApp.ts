import { createSlice } from '@reduxjs/toolkit'

type userType = {
  login: boolean
  isLoading: boolean
  error: boolean
}

const initialState: userType = {
  login: false,
  error: false,
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})
