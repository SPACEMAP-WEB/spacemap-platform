import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateTlesAndRsos } from './cesiumModules'
import { TargDrawRsos, TdrawRsos } from './type'

export const drawRsos = createAsyncThunk<TdrawRsos, TargDrawRsos>(
  'DRAW_RSOS',
  async ({ initialTime, duration = 3600, intervalUnitTime = 600 }) => {
    const initialTimeISOString = initialTime.toISOString()
    const { tles, rsoParams } = await updateTlesAndRsos(initialTime)
    const worker = new Worker('/script/tle2czml.js')
    return {
      initialTime,
      initialTimeISOString,
      duration,
      intervalUnitTime,
      tles,
      rsoParams,
      worker,
    }
  }
)
