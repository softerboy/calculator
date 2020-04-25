import {
  HISTORY_CLEAR,
  HISTORY_FETCH_COMPLETED,
  HISTORY_FETCH_ERROR,
  HISTORY_FETCH_PENDING,
  HISTORY_PUSH,
} from '../action-types'

const initialState = {
  list: [],
  error: '',
  fetching: false,
}

export default function (state = initialState, action) {
  const { type, payload } = action

  if (type === HISTORY_FETCH_PENDING) {
    return { ...state, error: '', fetching: true }
  }

  if (type === HISTORY_FETCH_COMPLETED) {
    return { list: payload, error: '', fetching: false }
  }

  if (type === HISTORY_FETCH_ERROR) {
    return { ...state, error: payload, fetching: false }
  }

  if (type === HISTORY_PUSH) {
    return { ...state, list: [payload, ...state.list], error: '' }
  }

  if (type === HISTORY_CLEAR) {
    return initialState
  }

  return state
}
