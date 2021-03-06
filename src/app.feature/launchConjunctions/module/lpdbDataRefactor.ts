import {
  LPDBDataType,
  LPDBTempDataType,
} from '@app.feature/launchConjunctions/types/launchConjunctions'
import moment from 'moment'

export const lpdbDataRefactor = (lpdbData: LPDBTempDataType[]): LPDBDataType[] => {
  let newData = []
  lpdbData.forEach((item, index) => {
    const { _id, pid, pName, sid, sName, dca, tcaStartTime, tcaEndTime, tcaTime } = item
    const formattedTcaTime = moment.utc(tcaTime).format('MMM DD, YYYY HH:mm:ss')
    const maxlength = 13
    const truncatedPName = pName.length > maxlength ? pName.slice(0, maxlength - 1) + '…' : pName
    const truncatedSName = sName.length > maxlength ? sName.slice(0, maxlength - 1) + '…' : sName
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
      'tca/dca': `${formattedTcaTime}`,
    })
    newData.push({
      ...spanData,
      primary: truncatedPName,
      secondary: truncatedSName,
      'tca/dca': String(dca),
    })
  })
  return newData
}
