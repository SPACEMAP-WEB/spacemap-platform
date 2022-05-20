import moment from 'moment'

const CesiumComponent = ({ cesiumModule }) => {
  // const today = moment().add(-1, 'days')
  const today = moment()
  cesiumModule.initiailze(today, 3600, 600)
  return <></>
}

export default CesiumComponent
