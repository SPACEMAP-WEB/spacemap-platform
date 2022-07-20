import * as Cesium from 'cesium'
import moment from 'moment'
import { createProperty, makePair } from 'src/app.store/cesium/cesiumModules'
import {
  TdrawConjuctions,
  TdrawLcaConjuctions,
  TdrawRsos,
  TDrawWc,
  TStateCesium,
} from 'src/app.store/cesium/type'

export const drawPath = async ({
  pid,
  sid,
  from,
  tca,
  to,
  primarySatColor,
  secondarySatColor,
  viewer,
}) => {
  const czmlDataSource = new Cesium.CzmlDataSource()
  const pairCzml = makePair(pid, sid, from, tca, to)
  await czmlDataSource.load({
    id: 'document',
    // name: 'CZML Point - Time Dynamic',
    version: '1.0',
    clock: {
      currentTime: `${tca}`,
      multiplier: 1,
      range: 'UNBOUNDED',
      step: 'SYSTEM_CLOCK_MULTIPLIER',
    },
  })
  const newDs = await czmlDataSource.process(pairCzml)
  console.log(newDs)
  // const primarySat = newDs.entities.getById(String(pid))

  // primarySat.path.material = new Cesium.PolylineOutlineMaterialProperty({
  //   outlineColor: primarySatColor,
  // })
  // primarySat.path.show = createProperty(true)
  // primarySat.label.outlineColor = createProperty(primarySatColor)
  // primarySat.label.pixelOffset = createProperty(new Cesium.Cartesian2(14, 14))
  // primarySat.label.show = createProperty(true)

  // const secondarySat = newDs.entities.getById(String(sid))
  // secondarySat.path.material = new Cesium.PolylineOutlineMaterialProperty({
  //   outlineColor: secondarySatColor,
  // })
  // secondarySat.path.show = createProperty(true)
  // secondarySat.label.outlineColor = createProperty(secondarySatColor)
  // secondarySat.label.pixelOffset = createProperty(new Cesium.Cartesian2(-14, -14))
  // secondarySat.label.show = createProperty(true)

  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(from)
}

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
  primarySat.path.show = createProperty(true)
  primarySat.label.outlineColor = createProperty(primarySatColor)
  primarySat.label.pixelOffset = createProperty(new Cesium.Cartesian2(14, 14))
  primarySat.label.show = createProperty(true)

  const secondarySat = newDs.entities.getById(String(sid))
  secondarySat.path.material = new Cesium.PolylineOutlineMaterialProperty({
    outlineColor: secondarySatColor,
  })
  secondarySat.path.show = createProperty(true)
  secondarySat.label.outlineColor = createProperty(secondarySatColor)
  secondarySat.label.pixelOffset = createProperty(new Cesium.Cartesian2(-14, -14))
  secondarySat.label.show = createProperty(true)

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

  let position: Cesium.Cartesian3

  lpdb.forEach(async (currRow, idx) => {
    const { primary, secondary, start, tca, end } = currRow
    if (idx === 0)
      position = ds.entities.getById(String(primary)).position.getValue(clockViewModel.startTime)
    const pairCzml = makePair(primary, secondary, start, tca, end)
    await czmlDataSource.process(pairCzml)
  })
  viewer.camera.flyTo({
    destination: new Cesium.Cartesian3(position.x * 4, position.y * 4, position.z * 4),
  })
}

export const drawCzmlOfWatchaCapture = async (
  ds: Cesium.CzmlDataSource,
  rest: { initialTime: moment.Moment } & TStateCesium & TDrawWc
) => {
  const { viewer, initialTime, siteCzml, siteConeCzml, czmlDataSource, epochTime, wcdb } = rest
  const {
    position: { cartesian },
  } = siteCzml
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
    viewer.camera.flyTo({
      destination: new Cesium.Cartesian3(cartesian[0] * 4, cartesian[1] * 4, cartesian[2] * 4),
    })
  })
}
