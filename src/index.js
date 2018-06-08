import "./style.scss"
import search from "./api"

search("85712").then(data => console.log(data))
