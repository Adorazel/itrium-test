import {QUEUE_UPDATE} from "../actionTypes"



const initialState = {
  items: []
}

const queueReducer = (state = initialState, action) => {

  switch (action.type) {

    case QUEUE_UPDATE:
      return {
        items: action.payload
      }

    default:
      return state
  }
}

export default queueReducer