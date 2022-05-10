import { ConjunctionsDataType, PPDBDataType } from '@app.modules/types/conjunctions'

export const ppdbDataRefactor = (ppdbData: ConjunctionsDataType[]): PPDBDataType[] => {
  let newData = []
  ppdbData.forEach((item, index) => {
    const { _id, pid, pName, sid, sName, dca, tcaStartTime, tcaEndTime, tcaTime, probability } =
      item
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
    })
    newData.push({
      ...spanData,
      primary: pName,
      secondary: sName,
    })
  })
  return newData
}
