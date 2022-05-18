import moment from 'moment'

const CesiumComponent = ({ cesiumModule }) => {
  // const today = moment().add(-1, 'days')
  const today = moment()
  console.log(today)
  cesiumModule.initiailize()
  return <></>
}

export default CesiumComponent
