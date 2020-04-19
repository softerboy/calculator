import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ButtonGrid from './ButtonGrid'
import { buttons, isNumberAction } from '../core/util'
import { MAX_INPUT_LENGTH } from '../common/constants'
import { SET_DISPLAY_RESULT } from '../store/action-types'

export default function ButtonGridState() {
  const dispatch = useDispatch()
  const { result: currentResult } = useSelector(function (state) {
    return state.display
  })

  function onClick(target) {
    return isNumberAction(target)
      ? onNumberButtonClick(target)
      : onOperationButtonClick(target)
  }

  function onNumberButtonClick(target) {
    // do nothing if current displayed
    // input length max than MAX_INPUT_LENGTH constant
    if (String(currentResult).length >= MAX_INPUT_LENGTH) return

    // in case of user pressed digit button and current
    // display input is integer, simply add selected digit
    // to back of current number
    if (Number.isInteger(currentResult)) {
      const payload = { result: currentResult * 10 + target.id }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // in case if user pressed digit button and current display
    // number is floating point, simply put entered digit to
    // back of current number
    if (!Number.isInteger(currentResult)) {
      const payload = { result: currentResult + '' + target.id }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }
  }

  function onOperationButtonClick(target) {
    if (target.id === buttons.BTN_SIGN && Number(currentResult) !== 0) {
      // swap sign
      const payload = { result: -1 * currentResult }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // cancel last user entered input (number)
    // if CE (Cancel Entry) button pressed
    if (target.id === buttons.BTN_CANCEL_ENTRY) {
      const payload = { result: 0 }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // clear display if C (Clear) button pressed
    if (target.id === buttons.BTN_CLEAR) {
      const payload = { expression: '', result: 0 }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // in case of pressing floating point button, check is current
    // display input integer or floating point number already
    // We no need to add floating point twice if already exist in
    // current display input
    if (
      String(currentResult).indexOf('.') < 0 &&
      target.id === buttons.BTN_FLOATING_POINT
    ) {
      const payload = { result: currentResult + '.' }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // if user entered Remove button simply remove last entered
    // digit or floating point from display
    if (target.id === buttons.BTN_REMOVE) {
      const resultCharArray = String(currentResult).split('')
      const payload = {}
      if (resultCharArray.length === 1) {
        payload.result = 0
      } else if (resultCharArray.length === 2 && resultCharArray[0] === '-') {
        // case minus (-) with one number
        payload.result = 0
      } else {
        payload.result = resultCharArray.slice(0, -1).join('')
      }

      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }
  }

  return <ButtonGrid onClick={onClick} />
}
