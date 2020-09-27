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

export default bindActionCreators