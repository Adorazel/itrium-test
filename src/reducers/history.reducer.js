import {HISTORY_ACTIVATE_ITEM, HISTORY_ADD_ITEM, HISTORY_PURGE, HISTORY_REMOVE_ITEM, HISTORY_SET} from "../actionTypes";

const saveHistory = items => {
  localStorage.setItem("ITRIUM_DEMO_HISTORTY", JSON.stringify([...items]))
}

const initialState = {
  items: []
}

let newItems

const historyReducer = (state = initialState, action) => {
  switch (action.type) {

    case HISTORY_SET:
      newItems = action.payload
      saveHistory(newItems)
      return {items: newItems}

    case HISTORY_ADD_ITEM:
      newItems = [action.payload, ...state.items.map(item => {
        item.active = false
        return item
      })]
      saveHistory(newItems)
      return {items: newItems}

    case HISTORY_ACTIVATE_ITEM:
      newItems = [...state.items].map(item => {
        item.active = item.id === action.payload
        return item
      })
      saveHistory(newItems)
      return {items: newItems}

    case HISTORY_REMOVE_ITEM:
      newItems = state.items.filter(({id}) => id !== action.payload)
      saveHistory(newItems)
      return {items: newItems}

    case HISTORY_PURGE:
      saveHistory([])
      return {items: []}

    default:
      return state
  }
}

export default historyReducer