import { SET_DISPLAY_RESULT } from '../action-types'

export function setDisplayResult(expression, result) {
  return {
    type: SET_DISPLAY_RESULT,
    payload: { result, expression },
  }
}
