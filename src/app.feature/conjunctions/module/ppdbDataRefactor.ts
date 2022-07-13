import { ConjunctionsDataType, PPDBDataType } from '@app.feature/conjunctions/types/conjunctions'
import remainingTimeChecker from '@app.modules/util/remainingTimeChecker'
import { TimeFormatType } from '@app.modules/types/time'
import moment from 'moment'

export const ppdbDataRefactor = (
  ppdbData: ConjunctionsDataType[],
  timeFormat: TimeFormatType
): PPDBDataType[] => {
  let newData = []
  ppdbData.forEach((item, index) => {
    const { _id, pid, pName, sid, sName, dca, tcaStartTime, tcaEndTime, tcaTime, probability } =
      item
    const formattedTcaTime = () => {
      switch (timeFormat) {
        case 'UTC':
          return moment.utc(tcaTime).format('MMM DD, YYYY HH:mm:ss ZZ')
        case 'LOCAL':
          return moment.utc(tcaTime).local().format('MMM DD, YYYY HH:mm:ss ZZ')
        case 'REMAINING':
          return remainingTimeChecker(moment.utc(tcaTime))
        default:
          return moment.utc(tcaTime).format('MMM DD, YYYY HH:mm:ss ZZ')
      }
    }
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
      probability,
    }
    newData.push({
      ...spanData,
      primary: String(pid),
      secondary: String(sid),
      'tca/dca': `${formattedTcaTime()}`,
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
