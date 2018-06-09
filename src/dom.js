import chroma from "chroma-js"
import search from "./api"

const colorScale = chroma
  .scale("RdYlBu")
  .padding(0.2)
  .domain([130, -20])

const input = document.getElementById("input")
const go = document.getElementById("go")
const current = document.getElementById("current")

let unitToggle = true

const storeData = data => {
  current.dataset.celsius = `${data.current.c} °C`
  current.dataset.fahrenheit = `${data.current.f} °F`
}

const displayData = data => {
  updateElement("name", data.name)
  updateElement("current", `${data.current.f} °F`)
  updateElement("condition", data.condition)
}

const setBackgroundColor = data => {
  const newColor = colorScale(data.current.f)
  document.body.style.backgroundColor = newColor
}

const updateElement = (elementId, text) => {
  const element = document.getElementById(elementId)
  element.textContent = text
}

go.addEventListener("click", async () => {
  console.log("searching", input.value)
  let data = await search(input.value)
  if (data) {
    setBackgroundColor(data)
    storeData(data)
    displayData(data)
  }
})

current.addEventListener("click", data => {
  if (unitToggle) {
    current.textContent = current.dataset.celsius
  } else {
    current.textContent = current.dataset.fahrenheit
  }
  unitToggle = !unitToggle
})
