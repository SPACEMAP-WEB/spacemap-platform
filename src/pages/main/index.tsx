import dynamic from 'next/dynamic'
import Head from 'next/head'

const CesiumComponent = dynamic(() => import('app.components/Cesium'), {
  ssr: false,
})

const PageMain = () => {
  return (
    <>
      <Head>
        <link
          href="https://cesium.com/downloads/cesiumjs/releases/1.92/Build/Cesium/Widgets/widgets.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div id="cesiumContainer" />
      <CesiumComponent />
    </>
  )
}

export default PageMain
