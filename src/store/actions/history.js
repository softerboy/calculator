import axios from 'axios'

import { MSG_ERROR_HISTORY_FETCH } from '../../common/constants'

import {
  HISTORY_CLEAR,
  HISTORY_FETCH_COMPLETED,
  HISTORY_FETCH_ERROR,
  HISTORY_FETCH_PENDING,
  HISTORY_PUSH,
} from '../action-types'

function apiHistoryMapper({ calculation, result }) {
  return { expression: calculation, result }
}

export function historyPush(expression, result) {
  return { payload: { expression, result }, type: HISTORY_PUSH }
}

export function historyClear() {
  return { type: HISTORY_CLEAR }
}

export function fetchHistory() {
  return function (dispatch) {
    dispatch({ type: HISTORY_FETCH_PENDING })
    return axios
      .get('/calculations')
      .then(function (response) {
        return dispatch({
          type: HISTORY_FETCH_COMPLETED,
          payload: response.data.map(apiHistoryMapper),
        })
      })
      .catch(function (/*error*/) {
        return dispatch({
          type: HISTORY_FETCH_ERROR,
          payload: MSG_ERROR_HISTORY_FETCH,
        })
      })
  }
}
