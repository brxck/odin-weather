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

search("85712")
  .then(response => response.json())
  .then(response => console.log(response))
