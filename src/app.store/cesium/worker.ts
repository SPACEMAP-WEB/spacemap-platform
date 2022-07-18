import moment from 'moment'
import * as satellite from 'satellite.js'

self.addEventListener('message', async function (e) {
  const initialTimeWindow = e.data[0]
  const duration = e.data[1]
  const intervalUnitTime = e.data[2]
  const tles = e.data[3]
  const rsoParams = e.data[4]
  const tleCZML = await tle2czml(initialTimeWindow, duration, intervalUnitTime, tles, rsoParams)
  postMessage(tleCZML)
})

async function document2czml(startTime, duration) {
  let endTime = moment(startTime, 'YYYY-MM-DDTHH:mm:ss.SSSSZ')
    .clone()
    .add(duration, 's')
    .toISOString()
  let documentCZML = {
    id: 'document',
    // name: 'CZML Point - Time Dynamic',
    version: '1.0',
    clock: {
      currentTime: `${startTime}`,
      interval: `${startTime}/${endTime}`,
      multiplier: 1,
      range: 'UNBOUNDED',
      step: 'SYSTEM_CLOCK_MULTIPLIER',
    },
  }
  return documentCZML
}

async function tle2czml(initialTimeWindow, duration, intervalUnitTime, tles, rsoParams) {
  const totalCZML = []
  totalCZML.push(await document2czml(initialTimeWindow, duration))
  tles.forEach((tle) => {
    const satrec = satellite.twoline2satrec(tle.firstLine, tle.secondLine)
    const satName = tle.name
    let satID = satrec.satnum.split(' ').join('')
    satID = Number(satID.replace(/(^0+)/, ''))
    const currRsoParams = rsoParams[satID]
    try {
      const RSOType = currRsoParams.objtype
      const countryCode = currRsoParams.country
      const currCZML = satrec2czml(
        satrec,
        initialTimeWindow,
        duration,
        intervalUnitTime,
        satName,
        RSOType,
        countryCode
      )
      if (currCZML != null) totalCZML.push(currCZML)
    } catch (e) {
      console.error(e)
    }
  })

  return totalCZML
}

function satrec2czml(satrec, startTime, duration, intervalUnitTime, satName, RSOType, countryCode) {
  const res = [] //result for position
  const initTime = new Date(startTime)
  const twoPi = Math.PI * 2
  const periodSeconds = (twoPi / satrec.no) * 60
  const interval = periodSeconds / 12

  initTime.setSeconds(initTime.getSeconds() - periodSeconds / 2)
  const satID = Number(satrec.satnum.split(' ').join(''))
  for (let i = -periodSeconds / 2; i <= duration + periodSeconds / 2; i += interval) {
    const positionAndVelocity = satellite.propagate(satrec, initTime) // 0.0166667min = 1sec
    initTime.setSeconds(initTime.getSeconds() + interval)
    const positionEci = positionAndVelocity.position
    try {
      positionEci.x = positionEci.x * 1000
      positionEci.y = positionEci.y * 1000
      positionEci.z = positionEci.z * 1000
    } catch (err) {
      return null
    }
    res.push(i, positionEci.x, positionEci.y, positionEci.z)
  }
  // if ('46048' === satID) // console.log(res)
  const startAvailTime = moment(startTime, 'YYYY-MM-DDTHH:mm:ss.SSSSZ')
    .clone()
    .add(-duration - periodSeconds / 2, 's')
    .toISOString()
  const endAvailTime = moment(startTime, 'YYYY-MM-DDTHH:mm:ss.SSSSZ')
    .clone()
    .add(duration + periodSeconds / 2, 's')
    .toISOString()

  let rgba = []
  if (RSOType == 'PAYLOAD') {
    rgba = [0, 255, 0, 255]
  } else if (RSOType == 'ROCKET BODY') {
    rgba = [226, 66, 5, 255]
  } else if (RSOType == 'DEBRIS') {
    rgba = [200, 16, 46, 255]
  } else if (RSOType == 'TBA') {
    rgba = [120, 120, 120, 255]
  } else {
    rgba = [120, 120, 120, 255]
  }

  satName = satName.replace(/(^0+)/, '')
  const initialCZMLProps = {
    id: `${satID}`,
    name: `${satName} / ${satID}`,
    availability: `${startAvailTime}/${endAvailTime}`,
    description: `Orbit of Satellite: ${satName} / ${satID} / ${RSOType} / ${countryCode}`,
    point: {
      show: true,
      color: {
        rgba: [255, 255, 255, 255],
      },
      outlineColor: {
        rgba: [rgba[0], rgba[1], rgba[2], rgba[3]],
      },
      outlineWidth: 0.3,
      // pixelSize: pixelSize,
      scaleByDistance: { nearFarScalar: [8400000.0, 1.5, 27720000.0, 0.8] },
      translucencyByDistance: {
        nearFarScalar: [27720000.0, 1.0, 3600000000.0, 0.2],
      },
    },

    label: {
      fillColor: {
        rgba: [255, 255, 255, 255],
      },
      font: '12pt Roboto',
      horizontalOrigin: 'LEFT',
      outlineColor: {
        rgba: [138, 0, 250, 255],
      },
      outlineWidth: 2,
      pixelOffset: {
        cartesian2: [14, 14],
      },
      show: false,
      style: 'FILL_AND_OUTLINE',
      text: `${satName}/${satID}`,
      verticalOrigin: 'CENTER',
    },
    position: {
      interpolationAlgorithm: 'LAGRANGE',
      forwardExtrapolationType: 'NONE',
      forwardExtrapolationDuration: 0,
      backwardExtrapolationType: 'NONE',
      backwardExtrapolationDuration: 0,
      interpolationDegree: 2,
      referenceFrame: 'INERTIAL',
      epoch: `${startTime}`,
      cartesian: res,
    },
    path: {
      show: false,
      material: {
        polylineOutline: {
          color: {
            rgba: [255, 255, 255, 255],
          },
          outlineColor: {
            rgba: [138, 0, 250, 255],
          },
          outlineWidth: 2,
        },
      },
      width: 2,
      leadTime: periodSeconds / 2,
      trailTime: periodSeconds / 2,
      resolution: 20,
    },
  }

  return initialCZMLProps
}
