import {SET_FETCH_LOADING, SET_FETCH_SUCCESS, SET_FETCH_FAILURE} from "../actionTypes"

const setFetchLoading = () => SET_FETCH_LOADING

const setFetchSuccess = () => SET_FETCH_SUCCESS

const setFetchError = error => {
  return {
    type: SET_FETCH_FAILURE,
    payload: error
  }
}

export {
  setFetchLoading,
  setFetchSuccess,
  setFetchError
}