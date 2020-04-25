import { SET_DISPLAY_RESULT } from '../action-types'
import {
  MSG_DIVIDE_BY_ZERO,
  MSG_INVALID_ARGUMENT,
} from '../../common/constants'

export function setDisplayResult(expression, result) {
  let error = ''

  if (isNaN(result)) {
    error = MSG_INVALID_ARGUMENT
  } else if (!isFinite(result)) {
    error = MSG_DIVIDE_BY_ZERO
  }

  return {
    type: SET_DISPLAY_RESULT,
    payload: { result, expression, error },
  }
}
