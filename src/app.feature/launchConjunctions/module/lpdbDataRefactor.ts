import { PPDBDataType } from '@app.modules/types/conjunctions'
import { LPDBDataType } from '@app.modules/types/launchConjunctions'

export const lpdbDataRefactor = (lpdbData: LPDBDataType[]): PPDBDataType[] => {
  let newData = []
  lpdbData.forEach((item, index) => {
    const { _id, pid, pName, sid, sName, dca, tcaStartTime, tcaEndTime, tcaTime } = item
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
      'tca/dca': tcaTime,
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