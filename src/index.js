import "./style.scss"

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
    return response
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
    high: data.main.temp_max,
    low: data.main.temp_min,
    current: data.main.temp,
    clouds: cloudCondition(data.clouds.all),
    condition: data.weather[0].main
  }
  return processedData
}

const cloudCondition = percentage => {
  // Adapted from: https://www.weather.gov/media/pah/ServiceGuide/A-forecast.pdf
  if (percentage < 5) {
    return "clear"
  } else if (percentage < 25) {
    return "mostly clear"
  } else if (percentage < 50) {
    return "partly cloudy"
  } else if (percentage < 88) {
    return "mostly cloudy"
  } else {
    return "overcast"
  }
}

search("85712")
  .then(response => processResponse(response)) // Taking advantage of implicit return
  .then(data => console.log(data))
