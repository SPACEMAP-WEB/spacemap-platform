import * as Cesium from 'cesium'
import moment from 'moment'
import api from '@app.modules/api'
import { API_TLES, API_RSOS } from '@app.modules/keyFactory'
import { sgp4, twoline2satrec } from 'satellite.js'
class CesiumModule {
  constructor() {
    this.viewer
    this.tles
    this.rsoParams
    this.satrecs = []
    this.czmlDataSource
    this.primarySatColor = Cesium.Color.GOLD
    this.secondarySatColor = Cesium.Color.DARKORCHID
    this.apartColor = Cesium.Color.GREEN
    this.closeColor = Cesium.Color.RED

    this.prevPid
    this.prevSid
    this.rocketBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxMAAAsTAQCanBgAAAVOSURBVEhLtZZrUFRlGMeRy96XRQxEzAuolOgIOkIgrsoQloSNwgQpojKOt9IcGEEkb+A9LT9oJcHkrV11F1TWW4xOfqBPzTSUH2soEitrmkZWZBhn4d//eXd30kTjov+Z3+zZc97z/s/zvO/znBPwnBRCzD5EVwmMIVqYNToM4bH39LOTlohZOcFQnREjzeGIMIZiSuQotBUfAXbVK3MZ/CykIWPJCrPZjIkTJyI8Ogp7M99Gz46zwM56oJK/22z4jeYSubprkAokeUajEYmJidiyZQtE7e3tyF1WgE2p2eisOAlsP63MEyJHi+mgjcV0sUajQUlJiTJ8WG6aLyxchIq0+bgn5kxzlClMTL9Udw9Cy0NDQ1FVVeWzelxivmDJIpQzcg/THh0aLsb+TTcgraFpT01Njc/iyRLz3KUF2MM1D9MaBmVczE304MSJE+jo6MDm8nKUbliP4nfX4ozd5rN7VJ2dnYiNjfWv71ON48gO8gk5/BCHTCbTfbvdjq6uLixdWgiNOQxZFQeRuqIEU9Pnwnna7rN7VHFxcWIqpRZMepWUhiP35SRcyCuGbcFafFVYgbjwKGj0OjgcDvT09KgUhuiNWG9rxPF7QM2fwMrPryBxTibO19f57LyqrKyEXq8X4yjl0ItGkbqs8Qm4s7Ea2H0eOHQNuzIWIcISBmddHbq7u9Vk7XfvwjgsAsfcwJFW4OM24DOaz16zGWXFG9QYv5KTk8V0Jek12hHkXEbMJPxdVust+n0XsXVWDnQSaZ1TReqXGJtofLzDa3yYSOTZ7+/kmr/nGwVVasHBwWIsy/eYhpELaaMm4P7mY8COM8CeBlTNeQtanQ5nnQ7fNP/K7XbLZJiU/roylMjX2S6rc9u2blVjpNS0WtWp8shjCiWuqVFj2Na4MSTSPefxAdMbotPC4XSqSXpTc3OzMjINi2TaI3k8BMuXLVPXamtrYbFY5PpiMelNsuAIGhLosWgNHjZxjzEopHsob7p0+TIKCgrgcrnUZP+VpF7ao6Tdj+jUqVN+0yLl8BQFPYRoVUpKCn5ubUV+fj4aGhrUpvJvrKdJSk1eFpxjjXeqvkteb8P5yqmem56B72/eVBPGx8fj+vXr6vhJklJjnYtpsZqpH+J7OqCUaccXueuxb3Ye0qxW/NjSolLOa2hqavLZPCond72GG5FjpNH0W68RrJuRDRy4wnJyoTTpDVits9D2620UFhYq8xs3bvjsvOsspfYC63ycJWLAxvGkWTWQUjaQSpbR/ovYOH0eza3KvKioSNVlY2OjMj3LXS91vpdV4GKH4/0DMhalk2/nT0hE28ajLEaveVlSFtJmzkTrrVtYvXo1DAYDPq2upqke26w5wEfXYF/4zoCMpYkcJXvJi6RJzH8Rc4mcad/PNZcN1/JTC6Kjo6ENCsZONhm5ht3nYM8v6bdxGLGRv8g8MoVUkK+zxiXQnGk/cBW2nHUI1xmrU2ekdsWMGYMPM5ew2VxQTUfGyFjeU0n6JBOpI38QK5lO7CSJxJBv3oybhjJuuDB+OfL/cLLKrNX3SIeT9np7Uy0yYyZ387yDjCb/K6nZS0QifYVMJfVkEskh24mseTMR01Ii382B0uEk0jvs7dbRL3l4Th5+JOmTpE+7SSIRM/kQG09eJZ3kIBFNJtnEqP6xw4XqDB43P1mTo2Ml0nNEMtFnSYuU9YwlTUSeeDZ5QE4SA+lNQUGBgZ5pI8aKaQORjdlvyXv4OxJOUoik9Ax54icKJQ8sD+ciFjnRX0mqfyCSwgQiphJBXySplfsHpN+JP50ShZSVTv17bgoI+Aellw/uG+hW+QAAAABJRU5ErkJggg=='
  }

  getViewer() {
    return this.viewer
  }

  async getTles(year, month, date, hour, duration) {
    const DATE_URI = '/' + year + '/' + month + '/' + date + '/' + hour
    const { data } = await api.GET(process.env.SPACEMAP_PLATFORM_API_URI + API_TLES + DATE_URI)
    const tles = data.data.tles
    this.tles = tles
    return tles
  }

  async getRsosParams() {
    const { data } = await api.GET(process.env.SPACEMAP_PLATFORM_API_URI + API_RSOS)
    const rsoParams = data.data.rsoParams
    this.rsoParams = rsoParams
    return rsoParams
  }

  async tles2satrecs(tles) {
    for (const tle of tles) {
      const satrec = twoline2satrec(tle.firstLine, tle.secondLine)
      this.satrecs.push(satrec)
    }
    return this.satrecs
  }

  async drawConjunctions(pid, sid, from, tca, to) {
    await this.turnOffIcrf()
    await this.clean()

    const primarySat = this.czmlDataSource.entities.getById(pid)
    console.log(primarySat.position.getValue(Cesium.JulianDate.fromIso8601(from)))
    primarySat.path.material.outlineColor.setValue(this.primarySatColor)
    primarySat.path.show = true
    primarySat.label.outlineColor = this.primarySatColor
    primarySat.label.pixelOffset = new Cesium.Cartesian2(14, 14)
    primarySat.label.show = true

    const secondarySat = this.czmlDataSource.entities.getById(sid)
    secondarySat.path.material.outlineColor.setValue(this.secondarySatColor)
    secondarySat.path.show = true
    secondarySat.label.outlineColor = this.secondarySatColor
    secondarySat.label.pixelOffset = new Cesium.Cartesian2(-14, -14)
    secondarySat.label.show = true

    const pairCzml = await this.makePair(pid, sid, from, tca, to)

    const viewer = this.viewer
    console.log(pairCzml)
    this.czmlDataSource.process(pairCzml).then(function (ds) {
      viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(from)
      viewer.timeline.updateFromClock()
      viewer.flyTo(ds.entities.getById(`${pid}/${sid}`))

      // viewer.flyTo(primarySat.position.getValue(viewer.clockViewModel.currentTime), {})
    })
    // this.tunrOnIcrf()
    this.prevPid = pid
    this.prevSid = sid
  }

  async lpdb2Czml(lpdb) {
    const czml = []
    const makePair = this.makePair
    for (const currRow of lpdb) {
      const pairCzml = await makePair(
        currRow.primary,
        currRow.secondary,
        currRow.start,
        currRow.tca,
        currRow.end
      )
      czml.push(pairCzml)
    }
    return czml
  }

  async drawLaunchConjunctions(trajectory, predictionEpochTime, launchEpochTime, lpdb) {
    await this.clean()
    // console.log(trajectory)
    // console.log(predictionEpochTime)
    // console.log(launchEpochTime)
    // console.log(lpdb)
    const czmlDataSource = this.czmlDataSource
    const [trajcetoryCzml, endInterval] = await this.trajectory2czml(
      trajectory,
      predictionEpochTime
    )
    const viewer = this.viewer
    // const lpdb2Czml = this.lpdb2Czml
    const makePair = this.makePair
    console.log(predictionEpochTime)
    const initialTime = moment(predictionEpochTime)
    const initialTimeISOString = initialTime.toISOString()
    const [tles, rsoParams] = await this.updateTlesAndRsos(initialTime)

    if (duration === undefined) {
      duration = 172800
      intervalUnitTime = 600
    }

    const worker = new Worker('/script/tle2czml.js')
    function updateCZML(initialTimeISOString, duration, intervalUnitTime, tles, rsoParams) {
      worker.postMessage([initialTimeISOString, duration, intervalUnitTime, tles, rsoParams])
      worker.onmessage = (e) => {
        czmlDataSource.load(e.data).then(function (ds) {
          const clockViewModel = viewer.clockViewModel
          clockViewModel.startTime = initialTime.toISOString()
          clockViewModel.endTime = initialTime.add(7, 'd').toISOString()
          console.log('!!!!')
          czmlDataSource.process(trajcetoryCzml).then(function (ds) {
            viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(launchEpochTime)
            viewer.timeline.updateFromClock()
            console.log('!!!')
            for (const currRow of lpdb) {
              const pairCzml = makePair(
                currRow.primary,
                currRow.secondary,
                currRow.start,
                currRow.tca,
                currRow.end
              )
              czmlDataSource.process(pairCzml).then(function (ds) {
                console.log('!!')
              })
            }
          })
        })
      }
    }
    updateCZML(predictionEpochTime, endInterval, 600, tles, rsoParams)

    // this.czmlDataSource.process(trajcetoryCzml).then(function (ds) {
    //   viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(launchEpochTime)
    //   viewer.timeline.updateFromClock()
    //   console.log('!!!')
    //   // viewer.trackedEntity = czmlDataSource.entities.getById(0)
    //   // viewer.selectedEntity = viewer.trackedEntity
    // })

    // const documentationCzml = ''
    const pairsCzml = ''

    await this.turnOnIcrf()
  }

  async trajectory2czml(trajcetory, predictionEpochTime) {
    let splitLines = trajcetory.split('\n')
    let startTime = new Date(predictionEpochTime)
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

    let trajectoryCzml = {
      id: '0',
      name: 'Launch Vehicle',
      availability: '',
      description: 'Launch Vehicle',
      billboard: {
        show: true,
        image: `data:image/png;base64,${this.rocketBase64}`,
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
    console.log(endInterval)
    return [trajectoryCzml, endInterval]
  }

  async turnOffPathNLabel(prevPid, prevSid) {
    const primarySat = this.czmlDataSource.entities.getById(prevPid)
    const secondarySat = this.czmlDataSource.entities.getById(prevSid)
    primarySat.path.show = false
    primarySat.label.show = false
    secondarySat.path.show = false
    secondarySat.label.show = false
  }

  async makePair(pid, sid, from, tca, to) {
    const pairCzml = {
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
    }
    return pairCzml
  }

  async initiailize(initialTime, duration, intervalUnitTime) {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk'

    const viewer = new Cesium.Viewer('cesiumContainer', {
      // sceneMode: Cesium.SceneMode.SCENE3D,
      // terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
      // terrainProvider: new Cesium.EllipsoidTerrainProvider({}),
      imageryProvider: new Cesium.TileMapServiceImageryProvider({
        url: Cesium.buildModuleUrl('/cesium/Assets/Textures/NaturalEarthII'),
      }),
      geocoder: false,
      scene3DOnly: true,
      skyAtmosphere: false,
      selectionIndicator: false,
      homeButton: false,
      baseLayerPicker: false,
      navigationHelpButton: false,

      // for performance
      contextOptions: {
        webgl: {
          alpha: false,
          depth: true,
          stencil: false,
          antialias: false,
          powerPreference: 'high-performance',
          premultipliedAlpha: true,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        },
        allowTextureFilterAnisotropic: false,
      },
      requestRenderMode: true,
      maximumRenderTimeChange: 0.05,
      targetFrameRate: 30,
      requestRenderMode: true,
      automaticallyTrackDataSourceClocks: true,
      skyBox: new Cesium.SkyBox({
        sources: {
          positiveX: '/image/cesiumBackground/px.png',
          negativeX: '/image/cesiumBackground/nx.png',
          positiveY: '/image/cesiumBackground/py.png',
          negativeY: '/image/cesiumBackground/ny.png',
          positiveZ: '/image/cesiumBackground/pz.png',
          negativeZ: '/image/cesiumBackground/nz.png',
        },
      }),
    })
    const scene = viewer.scene
    scene.requestRenderMode = true
    scene.globe.enableLighting = true

    if (initialTime === undefined) {
      initialTime = moment().utc().startOf('day')
    } else {
      initialTime = moment(initialTime)
    }
    console.log(initialTime)

    // await this.tles2satrecs(this.tles)

    console.log(initialTimeISOString)
    const czmlDataSource = new Cesium.CzmlDataSource()
    viewer.dataSources.add(czmlDataSource)
    this.czmlDataSource = czmlDataSource

    const initialTimeISOString = initialTime.toISOString()
    const [tles, rsoParams] = await this.updateTlesAndRsos(initialTime)
    if (duration === undefined) {
      duration = 172800
      intervalUnitTime = 600
    }

    const worker = new Worker('/script/tle2czml.js')
    function updateCZML(initialTimeISOString, duration, intervalUnitTime, tles, rsoParams) {
      worker.postMessage([initialTimeISOString, duration, intervalUnitTime, tles, rsoParams])
      worker.onmessage = (e) => {
        czmlDataSource.load(e.data).then(function (ds) {
          const clockViewModel = viewer.clockViewModel
          clockViewModel.startTime = initialTime.toISOString()
          clockViewModel.endTime = initialTime.add(7, 'd').toISOString()
        })
      }
    }
    updateCZML(initialTimeISOString, duration, intervalUnitTime, tles, rsoParams)

    this.viewer = viewer
    // this.turnOnIcrf()
    return null
  }

  async updateTlesAndRsos(initialTime) {
    const originTleDate = initialTime.clone().add(-1, 'd')
    const year = originTleDate.year()
    const month = originTleDate.month() + 1
    const date = originTleDate.date()
    const hour = originTleDate.hour()
    const tles = await this.getTles(year, month, date, hour)
    const rsoParams = await this.getRsosParams()
    return [tles, rsoParams]
  }

  async turnOnIcrf() {
    const viewer = this.viewer
    const scene = this.viewer.scene

    scene.postUpdate.addEventListener(icrf)
    function icrf(scene, time) {
      if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return
      }

      const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
      if (Cesium.defined(icrfToFixed)) {
        const camera = viewer.camera
        const offset = Cesium.Cartesian3.clone(camera.position)
        const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
        camera.lookAtTransform(transform, offset)
      }
    }
  }

  async turnOffIcrf() {
    const viewer = this.viewer
    const scene = this.viewer.scene

    scene.postUpdate.removeEventListener(icrf)
    function icrf(scene, time) {
      if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return
      }

      const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time)
      if (Cesium.defined(icrfToFixed)) {
        const camera = viewer.camera
        const offset = Cesium.Cartesian3.clone(camera.position)
        const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed)
        camera.lookAtTransform(transform, offset)
      }
    }
  }

  async clean() {
    if (this.prevPid !== undefined) {
      await this.turnOffPathNLabel(this.prevPid, this.prevSid)
      this.czmlDataSource.entities.removeById(`${this.prevPid}/${this.prevSid}`)
    }
  }
}

export default CesiumModule
