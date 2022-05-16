import * as Cesium from 'cesium'
import moment from 'moment'
import api from '@app.modules/api'
import { API_TLES, API_RSOS } from '@app.modules/keyFactory'
import { useQuery, useMutation } from 'react-query'
class CesiumModule {
  constructor(price) {
    this.price = price
    this.viewer
  }
  getViewer() {
    return this.viewer
  }
  getTles() {
    const tles = api.GET({ url: API_TLES })
    return tles
  }
  tles2Satrrec(tles) {
    tles = tles.text()
    // let RSOParameterResponseData = readRSOParameters()

    let tlesArray = tles.split('\r\n')
    let totalCZML = []
    // totalCZML.push(await document2czml(currentTime, duration));

    // tlesArray.forEach(async function (tle, i) {
    let i = 0
    let eachTLE = []
    let satrecArray = []
    for (let tle of tlesArray) {
      if (i % 3 == 0) {
        //first line
        eachTLE.push(tle)
      } else if (i % 3 == 1) {
        //second line
        eachTLE.push(tle)
      } else {
        //third line
        eachTLE.push(tle)
      }
    }
  }
  initiailize() {
    Cesium.Ion.defaultAccessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk'

    const viewer = new Cesium.Viewer('cesiumContainer', {
      // sceneMode: Cesium.SceneMode.SCENE3D,
      terrainProvider: Cesium.EllipsoidTerrainProvider(),
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
          positiveX: 'px.png',
          negativeX: 'nx.png',
          positiveY: 'py.png',
          negativeY: 'ny.png',
          positiveZ: 'pz.png',
          negativeZ: 'nz.png',
        },
      }),
    })
    var scene = viewer.scene
    // scene.requestRenderMode = true;
    scene.debugShowFramesPerSecond = true

    const clock = viewer.clock
    clock.startTime = moment().toISOString()
    clock.endTime = moment().add(7, 'd').toISOString()
    const clockViewModel = viewer.clockViewModel
    // const initialTimeISOString = moment().utc().startOf('day').toISOString();
    const initialTimeISOString = moment().utc().toISOString()
    const initialJulianDate = Cesium.JulianDate.fromIso8601(initialTimeISOString)

    let czmlDataSource = new Cesium.CzmlDataSource()
    viewer.dataSources.add(czmlDataSource)
    let documentCZML = {
      id: 'document',
      // name: 'CZML Point - Time Dynamic',
      version: '1.0',
      clock: {
        currentTime: `${moment().toISOString()}`,
        // interval: `${startTime}/${endTime}`,
        multiplier: 1,
        range: 'UNBOUNDED',
        step: 'SYSTEM_CLOCK_MULTIPLIER',
      },
    }
    czmlDataSource.load(documentCZML).then(function (ds) {})
    const worker = new Worker('/tle2czml.js')
    function updateCZML(initialTimeISOString, duration, intervalUnitTime) {
      console.log(initialTimeISOString)
      worker.postMessage([initialTimeISOString, duration, intervalUnitTime])
      const prevMultiplier = clock.multiplier
      worker.onmessage = (e) => {
        console.log(e.data)
        czmlDataSource.load(e.data).then(function (ds) {
          // console.log(ds);
          // });
          // return e.data;
          //   setTimeout(() => {
          //     updateCZML(
          //       Cesium.JulianDate.toIso8601(clock.tick()),
          //       duration,
          //       intervalUnitTime
          //     );
          //   }, 10000);
          //   clock.multiplier = prevMultiplier;
          //   clockViewModel.multiplier = prevMultiplier;
          //   clock.startTime = moment().toISOString();
          //   clock.endTime = moment().add(7, 'd').toISOString();
          //   console.log(clock);
          //   viewer.render();
        })
      }
    }

    const duration = 172800
    const intervalUnitTime = 600
    updateCZML(initialTimeISOString, duration, intervalUnitTime)

    this.viewer = viewer

    return null
  }
}

export default CesiumModule
