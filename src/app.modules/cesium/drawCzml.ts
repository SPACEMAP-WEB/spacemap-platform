import * as Cesium from 'cesium'
import moment from 'moment'
import { makePair } from 'src/app.store/cesium/cesiumModules'
import {
  TdrawConjuctions,
  TdrawLcaConjuctions,
  TdrawRsos,
  TDrawWc,
  TStateCesium,
} from 'src/app.store/cesium/type'

export const drawCzmlOfRsos = (
  ds: Cesium.CzmlDataSource,
  rest: { initialTime: moment.Moment } & TStateCesium & TdrawRsos
) => {
  const { viewer, initialTime } = rest
  viewer.dataSources.add(ds)
  const clockViewModel = viewer.clockViewModel
  clockViewModel.startTime = Cesium.JulianDate.fromIso8601(initialTime.toISOString())
  clockViewModel.stopTime = Cesium.JulianDate.fromIso8601(initialTime.add(7, 'd').toISOString())
  viewer.clockViewModel.currentTime = clockViewModel.startTime
  viewer.camera.flyHome()
}

export const drawCzmlOfConjuctions = async (
  ds: Cesium.CzmlDataSource,
  rest: { initialTime: moment.Moment } & TStateCesium & TdrawConjuctions
) => {
  const { viewer, czmlDataSource, primarySatColor, secondarySatColor, pid, sid, from, tca, to } =
    rest
  viewer.dataSources.add(ds)
  const pairCzml = makePair(pid, sid, from, tca, to)
  const newDs = await czmlDataSource.process(pairCzml)
  const primarySat = newDs.entities.getById(String(pid))
  primarySat.path.material = new Cesium.PolylineOutlineMaterialProperty({
    outlineColor: primarySatColor,
  })
  primarySat.path.show = new Cesium.ConstantProperty(true)
  primarySat.label.outlineColor = new Cesium.ConstantProperty(primarySatColor)
  primarySat.label.pixelOffset = new Cesium.ConstantProperty(new Cesium.Cartesian2(14, 14))
  primarySat.label.show = new Cesium.ConstantProperty(true)

  const secondarySat = newDs.entities.getById(String(sid))
  secondarySat.path.material = new Cesium.PolylineOutlineMaterialProperty({
    outlineColor: secondarySatColor,
  })
  secondarySat.path.show = new Cesium.ConstantProperty(true)
  secondarySat.label.outlineColor = new Cesium.ConstantProperty(secondarySatColor)
  secondarySat.label.pixelOffset = new Cesium.ConstantProperty(new Cesium.Cartesian2(-14, -14))
  secondarySat.label.show = new Cesium.ConstantProperty(true)

  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(from)
  viewer.flyTo(newDs.entities.getById(`${pid}/${sid}`))
}

export const drawCzmlOfLaunchConjuctions = async (
  ds: Cesium.CzmlDataSource,
  rest: { initialTime: moment.Moment } & TStateCesium & TdrawLcaConjuctions
) => {
  const { viewer, czmlDataSource, initialTime, trajectoryCzml, launchEpochTime, lpdb } = rest
  viewer.dataSources.add(ds)
  const clockViewModel = viewer.clockViewModel
  clockViewModel.startTime = Cesium.JulianDate.fromIso8601(initialTime.toISOString())
  clockViewModel.stopTime = Cesium.JulianDate.fromIso8601(initialTime.add(7, 'd').toISOString())
  await czmlDataSource.process(trajectoryCzml)
  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(launchEpochTime)
  lpdb.forEach(async (currRow) => {
    const pairCzml = makePair(
      currRow.primary,
      currRow.secondary,
      currRow.start,
      currRow.tca,
      currRow.end
    )
    await czmlDataSource.process(pairCzml)
  })
}

export const drawCzmlOfWatchaCapture = async (
  ds: Cesium.CzmlDataSource,
  rest: { initialTime: moment.Moment } & TStateCesium & TDrawWc
) => {
  const { viewer, initialTime, siteCzml, siteConeCzml, czmlDataSource, epochTime, wcdb } = rest
  viewer.dataSources.add(ds)
  const clockViewModel = viewer.clockViewModel
  clockViewModel.startTime = Cesium.JulianDate.fromIso8601(initialTime.toISOString())
  clockViewModel.stopTime = Cesium.JulianDate.fromIso8601(initialTime.add(7, 'd').toISOString())
  await czmlDataSource.process([siteCzml, siteConeCzml])
  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(epochTime)
  wcdb.forEach(async (currRow) => {
    const pairCzml = makePair(
      currRow.primary,
      currRow.secondary,
      currRow.start,
      currRow.tca,
      currRow.end
    )
    await czmlDataSource.process(pairCzml)
  })
}
