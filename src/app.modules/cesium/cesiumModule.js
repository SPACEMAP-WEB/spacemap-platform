import * as Cesium from 'cesium'
import moment from 'moment'
import api from '@app.modules/api'
import { API_TLES, API_RSOS } from '@app.modules/keyFactory'
import { useQuery, useMutation } from 'react-query'
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
    if (this.prevPid !== undefined) {
      await this.turnOffPathNLabel(this.prevPid, this.prevSid)
      this.czmlDataSource.entities.removeById(`${this.prevPid}/${this.prevSid}`)
    }
    const primarySat = this.czmlDataSource.entities.getById(pid)
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

    // console.log(this.viewer.clockViewModel.currentTime)
    // console.log(from)
    // this.viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(from)

    // console.log(Cesium.JulianDate.fromIso8601(from))

    // console.log(Cesium.JulianDate.toIso8601(this.viewer.clockViewModel.currentTime))

    console.log(pairCzml)
    const viewer = this.viewer
    this.czmlDataSource.process(pairCzml).then(function (ds) {
      console.log(ds.entities.getById(`${pid}/${sid}`))
      viewer.clockViewModel.currentTime = Cesium.JulianDate.fromIso8601(from)
      viewer.timeline.updateFromClock()
      const flyPromise = viewer.flyTo(ds.entities.getById(`${pid}/${sid}`), {
        duration: 2,
      })
    })

    // this.viewer.flyTo(this.czmlDataSource.entities.getById(`${pid}/${sid}`))
    this.prevPid = pid
    this.prevSid = sid
  }

  async drawLaunchConjunctions(trajectory, predictionEpochTime, launchEpochTime, lpdb) {
    console.log(trajectory)
    console.log(predictionEpochTime)
    console.log(launchEpochTime)
    console.log(lpdb)
    const trajcetoryCzml = await this.trajectory2czml(trajectory, predictionEpochTime)
    this.czmlDataSource.process(trajcetoryCzml)
    console.log(trajcetoryCzml)
    const documentationCzml = ''
    const pairsCzml = ''
  }

  async trajectory2czml(trajcetory, predictionEpochTime) {
    let splitLines = trajcetory.split('\n')
    let startTime = new Date(predictionEpochTime)
    let endTime
    let endInterval
    let listsss = []
    const cartesian = []
    for (let line of splitLines) {
      let words = line.split(/[\t\s,]+/)
      listsss.push(words[0])
      if (Number(words[0]) == null) {
        console.log(words[0])
      }
      for (let [index, word] of words.entries()) {
        if (index == 0 && word != '') {
          endInterval = Number(word)
          console.log(endInterval)
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
        image:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADdgAAA3YBfdWCzAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7Z13eFTF+sc/s9mEhJBCCx0htAChN5EONkClCCoWihf1iiIWxGsBBGw/xAsooCKIvYB0AemCIjWAJEDoNbT0TbJJts3vj0025+zZ3WwaCd58n4fn4cyZOWc273tm3nmrkFJSjlsXQogQIAKoBlR1+ufcVg3wBaxANDBBlDPArQUhREOgm+JfS0BXyMcdLGeAMgwhhC/Qjjxi3wHUKsZXmMsZoIxBCKEHhgAjgX5AQFGf6SMElf38CPXz45LRSLbVmntL6ov68HIUD4QQtYGngaeA2t6M8dXpiKxalQ7Vq1MnMJAq/v5UVfyrUqECAdkm/K1WRM6Yrls2c8JgyH2EpZwBShlCiN7AOOxfvUd6NAkNpWuNGnSqUYNOYWG0qVYNfx8fj89PT0rGnPfFk2GxKG+nlTNAKUAIEYR9iR8HtPB2XHhwMJ/36ZMv0ZWwKYgPœ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',
        scale: 0.25,
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

  async initiailize(year, month, date, hour, duration, intervalUnitTime) {
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
    // scene.postUpdate.addEventListener(icrf)
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

    const initialTime = moment().utc().startOf('day')
    const initialTimeISOString = initialTime.toISOString()

    const czmlDataSource = new Cesium.CzmlDataSource()
    viewer.dataSources.add(czmlDataSource)
    this.czmlDataSource = czmlDataSource

    if (year === undefined) {
      year = initialTime.year()
      month = initialTime.month() + 1
      date = initialTime.date()
      hour = initialTime.hour()
    }
    if (duration === undefined) {
      duration = 172800
      intervalUnitTime = 600
    }
    const tles = await this.getTles(year, month, date, hour)
    const rsoParams = await this.getRsosParams()
    // await this.tles2satrecs(this.tles)

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

    return null
  }
}

export default CesiumModule
