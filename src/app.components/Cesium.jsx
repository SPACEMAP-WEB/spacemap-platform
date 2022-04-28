import * as Cesium from 'cesium'

const CesiumComponent = () => {
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI3ZDQ4OGYzYi0zNjBmLTQ1ZTAtODUwNS0xNDgyYjA4NDRjYTMiLCJpZCI6NzQ5ODIsImlhdCI6MTYzODI1OTc1Mn0.pz3a2LRR9kAkSV5m8X3WdnE0RsimkJRJWld0PvHGThk'

  // Initialize the Cesium Viewer in the HTML element with the "cesiumContainer" ID.
  var viewer = new Cesium.Viewer('cesiumContainer')
  var scene = viewer.scene
  scene.debugShowFramesPerSecond = true
  var numberOfPoints = 100000
  var gridSize = 360 / Math.sqrt(numberOfPoints)
  var isPointPrimitive = true

  if (isPointPrimitive) {
    var pointCollection = scene.primitives.add(new Cesium.PointPrimitiveCollection())
  } else {
    var billboardCollection = scene.primitives.add(new Cesium.BillboardCollection())
    var canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    var context2D = canvas.getContext('2d')
    context2D.beginPath()
    context2D.arc(5, 5, 5, 0, Cesium.Math.TWO_PI, true)
    context2D.closePath()
    context2D.fillStyle = 'rgb(255, 255, 255)'
    context2D.fill()
  }

  for (var longitude = -180; longitude < 180; longitude += gridSize) {
    for (var latitude = -90; latitude < 90; latitude += gridSize / 2) {
      if (isPointPrimitive) {
        pointCollection.add({
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
          pixelSize: 10,
        })
      } else {
        billboardCollection.add({
          imageId: 'billboard point',
          image: canvas,
          position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        })
      }
    }
  }

  function animatePoints() {
    var positionScratch = new Cesium.Cartesian3()
    var points = pointCollection._pointPrimitives
    var length = points.length
    for (var i = 0; i < length; ++i) {
      var point = points[i]
      Cesium.Cartesian3.clone(point.position, positionScratch)
      Cesium.Cartesian3.add(positionScratch, new Cesium.Cartesian3(5000, 0, 5000), positionScratch)
      point.position = positionScratch
    }
  }

  function animateBillboards() {
    var positionScratch = new Cesium.Cartesian3()
    var billboards = billboardCollection._billboards
    var length = billboards.length
    for (var i = 0; i < length; ++i) {
      var billboard = billboards[i]
      Cesium.Cartesian3.clone(billboard.position, positionScratch)
      Cesium.Cartesian3.add(
        positionScratch,
        new Cesium.Cartesian3(1000, 1000, 1000),
        positionScratch
      )
      billboard.position = positionScratch
    }
  }

  if (isPointPrimitive) {
    scene.preRender.addEventListener(animatePoints)
  } else {
    scene.preRender.addEventListener(animateBillboards)
  }

  return <></>
}

export default CesiumComponent
