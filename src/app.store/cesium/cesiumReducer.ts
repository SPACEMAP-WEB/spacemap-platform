/* eslint-disable @typescript-eslint/comma-dangle */
import { createAsyncThunk } from '@reduxjs/toolkit'
import moment from 'moment'
import { site2czml, trajectory2czml, updateTlesAndRsos } from './cesiumModules'
import {
  TargDrawConjuctions,
  TargDrawLcaConjuctions,
  TargDrawRsos,
  TargDrawWc,
  TdrawConjuctions,
  TdrawLcaConjuctions,
  TdrawRsos,
  TDrawWc,
} from './type'

export const drawRsos = createAsyncThunk<TdrawRsos, TargDrawRsos>(
  'DRAW_RSOS',
  async ({ initialTime, duration = 3600, intervalUnitTime = 600 }) => {
    const initialTimeISOString = initialTime.toISOString()
    const { tles, rsoParams } = await updateTlesAndRsos(initialTime)

    return {
      initialTime,
      initialTimeISOString,
      duration,
      intervalUnitTime,
      tles,
      rsoParams,
    }
  }
)

export const drawConjunctions = createAsyncThunk<TdrawConjuctions, TargDrawConjuctions>(
  'DRAW_CONJUCTIONS',
  async ({ pid, sid, from, tca, to, intervalUnitTime = 600 }) => {
    const initialTime = moment(tca)
    const { tles, rsoParams } = await updateTlesAndRsos(initialTime)

    return {
      pid,
      sid,
      from,
      tca,
      to,
      tles,
      rsoParams,
      initialTime,
      intervalUnitTime,
    }
  }
)

export const drawLcaConjunctions = createAsyncThunk<TdrawLcaConjuctions, TargDrawLcaConjuctions>(
  'DRAW_LCA_CONJUCTIONS',
  async ({
    predictionEpochTime,
    trajectory,
    launchEpochTime,
    trajectoryLength = 3600,
    lpdb,
    intervalUnitTime = 600,
  }) => {
    const initialTime = moment(launchEpochTime).utc()
    const { tles, rsoParams } = await updateTlesAndRsos(moment(predictionEpochTime).utc())
    const { trajectoryCzml, endInterval } = trajectory2czml({ trajectory, predictionEpochTime })

    return {
      initialTime,
      predictionEpochTime,
      trajectory,
      launchEpochTime,
      intervalUnitTime,
      duration: trajectoryLength,
      lpdb,
      tles,
      rsoParams,
      trajectoryCzml,
      endInterval,
    }
  }
)

export const drawWatchaCapture = createAsyncThunk<TDrawWc, TargDrawWc>(
  'DRAW_WATCHA_CAPTURE',
  async ({ latitude, longitude, predictionEpochTime, epochTime, wcdb, intervalUnitTime = 600 }) => {
    const initialTime = moment(epochTime).utc()
    const { tles, rsoParams } = await updateTlesAndRsos(moment(predictionEpochTime).utc())
    const { siteCzml, siteConeCzml } = site2czml({ latitude, longitude, epochTime })

    return {
      initialTime,
      tles,
      rsoParams,
      siteCzml,
      siteConeCzml,
      wcdb,
      epochTime,
      intervalUnitTime,
    }
  }
)
