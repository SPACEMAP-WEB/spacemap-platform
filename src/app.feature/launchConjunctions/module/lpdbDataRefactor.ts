import { PPDBDataType } from '@app.modules/types/conjunctions'
import { LPDBDataType, LPDBTempDataType } from '@app.modules/types/launchConjunctions'
import moment from 'moment'

export const lpdbDataRefactor = (lpdbData: LPDBTempDataType[]): LPDBDataType[] => {
  let newData = []
  lpdbData.forEach((item, index) => {
    const { _id, pid, pName, sid, sName, dca, tcaStartTime, tcaEndTime, tcaTime } = item
    const formatedTcaTime = moment.utc(tcaTime).format('MMM DD, YY HH:mm:ss')
    const spanData = {
      index: index + 1,
      id: _id,
      dca,
      start: tcaStartTime,
      tca: tcaTime,
      end: tcaEndTime,
    }
    newData.push({
      ...spanData,
      primary: String(pid),
      secondary: String(sid),
      'tca/dca': `${formatedTcaTime}`,
    })
    newData.push({
      ...spanData,
      primary: pName,
      secondary: sName,
      'tca/dca': String(dca),
    })
  })
  return newData
}
