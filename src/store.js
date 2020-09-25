import {applyMiddleware, createStore} from "redux"
import reducer from "./reducers"
import thunkMiddleware from "redux-thunk"
import {composeWithDevTools} from 'redux-devtools-extension'

const stringMiddleware = () => (dispatch) => (action) => {
  if (typeof action === "string") return dispatch({type: action})
  return dispatch(action)
}

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(
      stringMiddleware,
      thunkMiddleware
    )
  )
)

export default store