import {HISTORY_ACTIVATE_ITEM, HISTORY_ADD_ITEM, HISTORY_PURGE, HISTORY_REMOVE_ITEM} from "../actionTypes";


const initialState = {
  items: []
}

const historyReducer = (state = initialState, action) => {
  switch (action.type) {

    case HISTORY_ADD_ITEM:
      return {
        items: [action.payload, ...state.items.map(item => {
          item.active = false
          return item
        })]
      }

    case HISTORY_ACTIVATE_ITEM:
      return {
        items: [...state.items].map(item => {
          item.active = item.id === action.payload
          return item
        })
      }

    case HISTORY_REMOVE_ITEM:
      return {
        items: state.items.filter(({id}) => id !== action.payload)
      }

    case HISTORY_PURGE:
      return {
        items: []
      }

    default:
      return state
  }
}

export default historyReducer