import * as Cesium from 'cesium'
import { makePair } from 'src/app.store/cesium/cesiumModules'

export const drawCzmlOfRsos = (ds, rest) => {
  const { viewer, initialTime } = rest
  viewer.dataSources.add(ds)
  const clockViewModel = viewer.clockViewModel
  clockViewModel.startTime = initialTime.toISOString()
  clockViewModel.endTime = initialTime.add(7, 'd').toISOString()
}

export const drawCzmlOfConjuctions = async (ds, rest) => {
  const { viewer, czmlDataSource, primarySatColor, secondarySatColor, pid, sid, from, tca, to } =
    rest
  viewer.dataSources.add(ds)
  const pairCzml = makePair(pid, sid, from, tca, to)
  const newDs = await czmlDataSource.process(pairCzml)
  const primarySat = newDs.entities.getById(pid)
  primarySat.path.material.outlineColor.setValue(primarySatColor)
  primarySat.path.show = true
  primarySat.label.outlineColor = primarySatColor
  primarySat.label.pixelOffset = new Cesium.Cartesian2(14, 14)
  primarySat.label.show = true

  const secondarySat = newDs.entities.getById(sid)
  secondarySat.path.material.outlineColor.setValue(secondarySatColor)
  secondarySat.path.show = true
  secondarySat.label.outlineColor = secondarySatColor
  secondarySat.label.pixelOffset = new Cesium.Cartesian2(-14, -14)
  secondarySat.label.show = true
  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(from)
  viewer.timeline.updateFromClock()
  viewer.flyTo(newDs.entities.getById(`${pid}/${sid}`))
}

export const drawCzmlOfLaunchConjuctions = async (ds, rest) => {
  const { viewer, czmlDataSource, initialTime, trajectoryCzml, launchEpochTime, lpdb } = rest
  viewer.dataSources.add(ds)
  const clockViewModel = viewer.clockViewModel
  clockViewModel.startTime = initialTime.toISOString()
  clockViewModel.endTime = initialTime.add(7, 'd').toISOString()
  await czmlDataSource.process(trajectoryCzml)
  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(launchEpochTime)
  viewer.timeline.updateFromClock()
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

export const drawCzmlOfWatchaCapture = async (ds, rest) => {
  const { viewer, initialTime, siteCzml, siteConeCzml, czmlDataSource, epochTime, wcdb } = rest
  viewer.dataSources.add(ds)
  const clockViewModel = viewer.clockViewModel
  clockViewModel.startTime = initialTime.toISOString()
  clockViewModel.endTime = initialTime.add(7, 'd').toISOString()
  await czmlDataSource.process([siteCzml, siteConeCzml])
  viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(epochTime)
  viewer.timeline.updateFromClock()
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
