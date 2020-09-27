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

export default tabHandler