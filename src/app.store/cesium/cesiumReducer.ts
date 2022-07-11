/* eslint-disable @typescript-eslint/comma-dangle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import { site2czml, trajectory2czml, updateTlesAndRsos } from './cesiumModules'
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

export const drawLcaConjuctions = createAsyncThunk<any, any>(
  'DRAW_LCA_CONJUCTIONS',
  async ({ predictionEpochTime, trajectory, launchEpochTime, trajcetoryLength = 3600, lpdb }) => {
    const initialTime = moment(predictionEpochTime).utc()
    const { tles, rsoParams } = await updateTlesAndRsos(initialTime)
    const { trajectoryCzml, endInterval } = trajectory2czml({ trajectory, predictionEpochTime })
    const worker = new Worker('/script/tle2czml.js')
    return {
      initialTime,
      predictionEpochTime,
      trajectory,
      launchEpochTime,
      intervalUnitTime: 600,
      duration: trajcetoryLength,
      lpdb,
      worker,
      tles,
      rsoParams,
      trajectoryCzml,
      endInterval,
    }
  }
)

export const drawWatchaCapture = createAsyncThunk<any, any>(
  'DRAW_WATCHA_CAPTURE',
  async ({ latitude, longitude, predictionEpochTime, epochTime, wcdb }) => {
    const initialTime = moment(predictionEpochTime).utc()
    const { tles, rsoParams } = await updateTlesAndRsos(initialTime)
    const { siteCzml, siteConeCzml } = site2czml({ latitude, longitude, epochTime })
    const worker = new Worker('/script/tle2czml.js')
    return {
      initialTime,
      tles,
      rsoParams,
      siteCzml,
      siteConeCzml,
      wcdb,
      worker,
      epochTime,
    }
  }
)
