// Can't hide key, oh well
const apiKey = "fcf550c75447a36bd61343546421bbcc"

const search = async value => {
  try {
    let response
    if (isZip(value)) {
      response = await zipCurrent(value)
    } else {
      response = await nameCurrent(value)
    }
    if (response.status !== 200) {
      return
    }
    return await processResponse(response)
  } catch (error) {
    console.log(error)
    return false
  }
}

const zipCurrent = zip => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${apiKey}`,
    {
      mode: "cors"
    }
  )
}

const nameCurrent = name => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${apiKey}`,
    {
      mode: "cors"
    }
  )
}

const isZip = value => {
  return !isNaN(parseFloat(value)) && isFinite(value) && value.length === 5
}

const processResponse = async response => {
  const data = await response.json()
  const processedData = {
    name: data.name,
    high: {
      c: Math.round(data.main.temp_max - 273.15),
      f: Math.round(data.main.temp_max * (9 / 5) - 459.67)
    },
    low: {
      c: Math.round(data.main.temp_min - 273.15),
      f: Math.round(data.main.temp_min * (9 / 5) - 459.67)
    },
    current: {
      c: Math.round(data.main.temp - 273.15),
      f: Math.round(data.main.temp * (9 / 5) - 459.67)
    },
    condition: data.weather[0].main,
    conditionId: data.weather[0].id
  }
  return processedData
}

export default search
