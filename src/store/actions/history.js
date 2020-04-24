import {
  HISTORY_APPLY,
  HISTORY_CLEAR,
  HISTORY_ERROR,
  HISTORY_PUSH,
} from '../action-types'

export function historyPush(item) {
  return { payload: item, type: HISTORY_PUSH }
}

export function historyClear() {
  return { type: HISTORY_CLEAR }
}

export function historyApply(items) {
  return {
    payload: items,
    type: HISTORY_APPLY,
  }
}

export function historyError(error) {
  return {
    payload: error,
    type: HISTORY_ERROR,
  }
}
