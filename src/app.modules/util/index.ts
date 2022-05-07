type UriObject = {
  [key: string]: number | string | boolean
}

export const qs = {
  convertQueryString: (data: UriObject) => {
    if (!Object.keys(data).length) return ''
    const pairs = []
    for (let prop in data) {
      if (Object.prototype.hasOwnProperty.call(data, prop)) {
        let k = prop
        let v = data[prop]
        pairs.push(`${k}=${v}`)
      }
    }
    return pairs.join('&')
  },

  convertStringObject: (searchString: string) => {
    if (!searchString) return false
    return searchString
      .substring(1)
      .split('&')
      .reduce((result: { [key: string]: string }, next: string) => {
        let pair = next.split('=')
        result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
        return result
      }, {})
  },
}

export const dateSort = <T extends { date: string | number }>(arr: T[], orderBy = 'asc') => {
  return arr.sort((a, b) => {
    let dateA = new Date(a.date).getTime()
    let dateB = new Date(b.date).getTime()

    if (orderBy === 'desc') return dateB > dateA ? 1 : -1 // 내림차순

    return dateA > dateB ? 1 : -1
  })
}

export const objectToQueryString = (data: UriObject) => {
  if (!Object.keys(data).length) return ''
  const pairs = []
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      let k = prop
      let v = data[prop]
      pairs.push(`${k}=${v}`)
    }
  }
  return pairs.join('&')
}

export const objectToURL = (data: UriObject) => {
  if (Object.keys(data).length > 0) {
    return '?' + objectToQueryString(data)
  }
  return ''
}
