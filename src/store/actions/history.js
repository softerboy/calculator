import axios from 'axios'

import {
  MSG_ERROR_HISTORY_CALCULATION_POST,
  MSG_ERROR_HISTORY_FETCH,
} from '../../common/constants'

import {
  HISTORY_CLEAR,
  HISTORY_FETCH_COMPLETED,
  HISTORY_FETCH_ERROR,
  HISTORY_FETCH_PENDING,
  HISTORY_POST_CALCULATION_COMPLETED,
  HISTORY_POST_CALCULATION_PENDING,
  HISTORY_POST_CALCULATION_REJECTED,
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

export function postCalculation(calculation) {
  return function (dispatch) {
    dispatch({ type: HISTORY_POST_CALCULATION_PENDING })

    return axios
      .post('/calculations', calculation)
      .then(function (/*response*/) {
        // in future you can show popup message something like:
        // "Your calculation result synced" etc.
        return dispatch({
          type: HISTORY_POST_CALCULATION_COMPLETED,
          payload: calculation,
        })
      })
      .catch(function (/*error*/) {
        return dispatch({
          type: HISTORY_POST_CALCULATION_REJECTED,
          payload: MSG_ERROR_HISTORY_CALCULATION_POST,
        })
      })
  }
}
