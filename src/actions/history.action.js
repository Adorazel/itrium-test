import {HISTORY_ACTIVATE_ITEM, HISTORY_ADD_ITEM, HISTORY_PURGE, HISTORY_REMOVE_ITEM} from "../actionTypes"

const addHistoryItem = dispatch => item => {
  dispatch({
    type: HISTORY_ADD_ITEM,
    payload: item
  })
}

const activateHistoryItem = dispatch => id => {
  dispatch({
    type: HISTORY_ACTIVATE_ITEM,
    payload: id
  })
}

const removeHistoryItem = dispatch => id => {
  dispatch({
    type: HISTORY_REMOVE_ITEM,
    payload: id
  })
}

const purgeHistory = dispatch => () => {
  dispatch(HISTORY_PURGE)
}

export {
  addHistoryItem,
  removeHistoryItem,
  purgeHistory,
  activateHistoryItem
}