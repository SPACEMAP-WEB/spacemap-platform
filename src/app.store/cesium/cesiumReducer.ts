/* eslint-disable @typescript-eslint/comma-dangle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import { updateTlesAndRsos } from './cesiumModules'
import { TargDrawConjuctions, TargDrawRsos, TdrawRsos } from './type'

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
      worker,
      tles,
      rsoParams,
    }
  }
)

export const drawConjuctions = createAsyncThunk<any, TargDrawConjuctions>(
  'DRAW_CONJUCTIONS',
  async ({ pid, sid, from, tca, to }) => {
    const { tles, rsoParams } = await updateTlesAndRsos(moment(tca))
    const worker = new Worker('/script/tle2czml.js')

    return {
      pid,
      sid,
      from,
      tca,
      to,
      worker,
      tles,
      rsoParams,
    }
  }
)

export const drawLcaConjuctions = createAsyncThunk(
  'DRAW_LCA_CONJUCTIONS',
  async ({ initialTime, duration = 3600, intervalUnitTime = 600 }) => {}
)
