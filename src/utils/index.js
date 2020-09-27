import Queue from "./Queue"

const bindActionCreators = (actions = {key: ()=>{}}, dispatch) => {

  let funcs = Object.values(actions)
  funcs = funcs.map(fn => fn(dispatch))

  const newActions = {}
  const keys = Object.keys(actions)

  keys.forEach((key, i) => {
    newActions[key] = funcs[i]
  })

  return newActions
}

const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((wrapped, fn) => fn(wrapped), comp)
}

const tabHandler = (event, section) => {
  event.preventDefault()

  const tabs = [...section.querySelectorAll(".nav-link")]
  tabs.forEach(item => {
    item.classList.remove("active")
  })
  event.target.classList.add("active")

  const tabContents = [...section.querySelectorAll(".tab-pane")]
  tabContents.forEach(item => {
    item.classList.remove("active")
  })
  const id = "#" + event.target.href.split("#")[1]
  section.querySelector(id).classList.add("active")
}

export {
  Queue,
  compose,
  tabHandler,
  bindActionCreators
}