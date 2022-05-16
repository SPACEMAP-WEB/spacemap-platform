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

  async drawPairs(pid, sid, from, tca, to) {
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
    scene.debugShowFramesPerSecond = true

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
