import api from '@app.modules/api'
import { API_RSOS, API_TLES } from '@app.modules/keyFactory'
import { TRsoParams, Ttle } from './type'
const rocketBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAVOSURBVEhLtZZrUFRlGMeRy96XRQxEzAuolOgIOkIgrsoQloSNwgQpojKOt9IcGEEkb+A9LT9oJcHkrV11F1TWW4xOfqBPzTSUH2soEitrmkZWZBhn4d//eXd30kTjov+Z3+zZc97z/s/zvO/znBPwnBRCzD5EVwmMIVqYNToM4bH39LOTlohZOcFQnREjzeGIMIZiSuQotBUfAXbVK3MZ/CykIWPJCrPZjIkTJyI8Ogp7M99Gz46zwM56oJK/22z4jeYSubprkAokeUajEYmJidiyZQtE7e3tyF1WgE2p2eisOAlsP63MEyJHi+mgjcV0sUajQUlJiTJ8WG6aLyxchIq0+bgn5kxzlClMTL9Udw9Cy0NDQ1FVVeWzelxivmDJIpQzcg/THh0aLsb+TTcgraFpT01Njc/iyRLz3KUF2MM1D9MaBmVczE304MSJE+jo6MDm8nKUbliP4nfX4ozd5rN7VJ2dnYiNjfWv71ON48gO8gk5/BCHTCbTfbvdjq6uLixdWgiNOQxZFQeRuqIEU9Pnwnna7rN7VHFxcWIqpRZMepWUhiP35SRcyCuGbcFafFVYgbjwKGj0OjgcDvT09KgUhuiNWG9rxPF7QM2fwMrPryBxTibO19f57LyqrKyEXq8X4yjl0ItGkbqs8Qm4s7Ea2H0eOHQNuzIWIcISBmddHbq7u9Vk7XfvwjgsAsfcwJFW4OM24DOaz16zGWXFG9QYv5KTk8V0Jek12hHkXEbMJPxdVust+n0XsXVWDnQSaZ1TReqXGJtofLzDa3yYSOTZ7+/kmr/nGwVVasHBwWIsy/eYhpELaaMm4P7mY8COM8CeBlTNeQtanQ5nnQ7fNP/K7XbLZJiU/roylMjX2S6rc9u2blVjpNS0WtWp8shjCiWuqVFj2Na4MSTSPefxAdMbotPC4XSqSXpTc3OzMjINi2TaI3k8BMuXLVPXamtrYbFY5PpiMelNsuAIGhLosWgNHjZxjzEopHsob7p0+TIKCgrgcrnUZP+VpF7ao6Tdj+jUqVN+0yLl8BQFPYRoVUpKCn5ubUV+fj4aGhrUpvJvrKdJSk1eFpxjjXeqvkteb8P5yqmem56B72/eVBPGx8fj+vXr6vhJklJjnYtpsZqpH+J7OqCUaccXueuxb3Ye0qxW/NjSolLOa2hqavLZPCond72GG5FjpNH0W68RrJuRDRy4wnJyoTTpDVits9D2620UFhYq8xs3bvjsvOsspfYC63ycJWLAxvGkWTWQUjaQSpbR/ovYOH0eza3KvKioSNVlY2OjMj3LXS91vpdV4GKH4/0DMhalk2/nT0hE28ajLEaveVlSFtJmzkTrrVtYvXo1DAYDPq2upqke26w5wEfXYF/4zoCMpYkcJXvJi6RJzH8Rc4mcad/PNZcN1/JTC6Kjo6ENCsZONhm5ht3nYM8v6bdxGLGRv8g8MoVUkK+zxiXQnGk/cBW2nHUI1xmrU2ekdsWMGYMPM5ew2VxQTUfGyFjeU0n6JBOpI38QK5lO7CSJxJBv3oybhjJuuDB+OfL/cLLKrNX3SIeT9np7Uy0yYyZ387yDjCb/K6nZS0QifYVMJfVkEskh24mseTMR01Ii382B0uEk0jvs7dbRL3l4Th5+JOmTpE+7SSIRM/kQG09eJZ3kIBFNJtnEqP6xw4XqDB43P1mTo2Ml0nNEMtFnSYuU9YwlTUSeeDZ5QE4SA+lNQUGBgZ5pI8aKaQORjdlvyXv4OxJOUoik9Ax54icKJQ8sD+ciFjnRX0mqfyCSwgQiphJBXySplfsHpN+JP50ShZSVTv17bgoI+Aellw/uG+hW+QAAAABJRU5ErkJggg=='

// drawRsos

export const getTles = async (year, month, date, hour) => {
  const DATE_URI = '/' + year + '/' + month + '/' + date + '/' + hour
  const { data } = await api.GET<null, { data: { tles: Ttle } }>(API_TLES + DATE_URI)
  return data.data.tles
}

export const getRsosParams = async () => {
  const { data } = await api.GET<null, { data: { rsoParams: TRsoParams } }>(API_RSOS)
  return data.data.rsoParams
}

export const dateParser = (initialTime) => {
  const originTleDate = initialTime.clone().add(0, 'd')
  const year = originTleDate.year()
  const month = originTleDate.month() + 1
  const date = originTleDate.date()
  const hour = originTleDate.hour()
  return { year, month, date, hour }
}

export const updateTlesAndRsos = async (initialTime) => {
  const { year, month, date, hour } = dateParser(initialTime)
  const tles = await getTles(year, month, date, hour)
  const rsoParams = await getRsosParams()
  return { tles, rsoParams }
}

// drawConjuctions
export const turnOffPathNLabel = ({ prevPid, prevSid, czmlDataSource }) => {
  const primarySat = czmlDataSource.entities.getById(prevPid)
  const secondarySat = czmlDataSource.entities.getById(prevSid)
  primarySat.path.show = false
  primarySat.label.show = false
  secondarySat.path.show = false
  secondarySat.label.show = false
}

export const clean = ({ prevPid = null, prevSid = null, czmlDataSource }) => {
  if (prevPid) {
    turnOffPathNLabel({ prevPid, prevSid, czmlDataSource })
    czmlDataSource.entities.removeById(`${prevPid}/${prevSid}`)
  }
}

export const makePair = (pid, sid, from, tca, to) => ({
  id: `${pid}/${sid}`,
  name: `${pid} to ${sid}`,
  availability: [`${from}/${to}`],
  polyline: {
    show: true,
    width: 5,
    material: {
      polylineOutline: {
        color: [
          {
            interval: `${from}/${tca}`,
            rgba: [255, 0, 0, 255],
          },
          {
            interval: `${tca}/${to}`,
            rgba: [0, 255, 0, 255],
          },
        ],
        outlineColor: {
          rgba: [255, 255, 255, 255],
        },
        outlineWidth: 2,
      },
    },
    arcType: 'NONE',
    positions: {
      references: [`${pid}#position`, `${sid}#position`],
    },
  },
})

const createTrajectoryCzml = (startTime, endTime, cartesian) => {
  let trajectoryCzml = {
    id: '0',
    name: 'Launch Vehicle',
    availability: '',
    description: 'Launch Vehicle',
    billboard: {
      show: true,
      image: `data:image/png;base64,${rocketBase64}`,
    },
    label: {
      fillColor: {
        rgba: [255, 255, 255, 255],
      },
      font: '11pt Roboto',
      horizontalOrigin: 'LEFT',
      outlineColor: {
        rgba: [230, 250, 0, 255],
      },
      outlineWidth: 2,
      pixelOffset: {
        cartesian2: [12, 0],
      },
      show: true,
      style: 'FILL_AND_OUTLINE',
      text: 'Launch Vehicle',
      verticalOrigin: 'CENTER',
    },
    model: {
      show: true,
      minimumPixelSize: 99,
    },
    path: {
      material: {
        polylineOutline: {
          color: {
            rgba: [255, 255, 255, 255],
          },
          outlineColor: {
            rgba: [230, 250, 0, 255],
          },
          outlineWidth: 2,
        },
      },
      width: 4,
      leadTime: 6000,
      trailTime: 6000,
      resolution: 20,
    },
    position: {
      interpolationAlgorithm: 'LAGRANGE',
      interpolationDegree: 2,
      referenceFrame: 'INERTIAL',
      epoch: '',
      cartesian: [],
    },
  }
  trajectoryCzml.position.cartesian = cartesian
  trajectoryCzml.position.epoch = startTime
  trajectoryCzml.availability = `${startTime}/${endTime}`

  return trajectoryCzml
}

export const trajectory2czml = ({ trajcetory, predictionEpochTime }) => {
  let splitLines = trajcetory.split('\n')
  let startTime: Date | string = new Date(predictionEpochTime)
  let endTime
  let endInterval
  const cartesian = []
  for (let line of splitLines) {
    let words = line.split(/[\t\s,]+/)

    if (Number(words[0]) === NaN || words.length !== 4) {
      continue
    }
    for (let [index, word] of words.entries()) {
      if (index == 0 && word != '') {
        endInterval = Number(word)
      }
      if (word == '\r' || word == ' ' || word == '') {
        continue
      }
      if (Number.isNaN(Number(word)) !== true) {
        cartesian.push(Number(word))
      }
    }
  }

  endTime = new Date(startTime.getTime() + endInterval * 1000)
  startTime = startTime.toISOString()
  endTime = endTime.toISOString()

  const trajectoryCzml = createTrajectoryCzml(startTime, endTime, cartesian)

  return { trajectoryCzml, endInterval }
}

export const updateCZML = ({
  initialTime,
  initialTimeISOString,
  duration,
  intervalUnitTime,
  callback,
  ...rest
}) => {
  const { tles, rsoParams, czmlDataSource, worker } = rest
  worker.postMessage([initialTimeISOString, duration, intervalUnitTime, tles, rsoParams])
  worker.onmessage = (e) => {
    rest.viewer.dataSources.removeAll()
    czmlDataSource.load(e.data).then((ds) => callback(ds, { initialTime, ...rest }))
    worker.terminate()
  }
}
