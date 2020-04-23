import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Keyboard from './Keyboard'
import { buttons } from '../common/constants'
import { MAX_INPUT_LENGTH } from '../common/constants'
import { isNumberAction, isOperatorAction, isUnaryOperator } from '../core/util'
import {
  ACCUMULATOR_PUSH,
  ACCUMULATOR_CLEAR,
  SET_DISPLAY_RESULT,
  ACCUMULATOR_REPLACE_LAST,
} from '../store/action-types'

export default function KeyboardState() {
  const dispatch = useDispatch()
  const [equalButtonPressed, setEqualButtonPressed] = useState(false)
  const [expressionCalculated, setExpressionCalculated] = useState(false)
  const [
    isLastOperationButtonPressed,
    setIsLastOperationButtonPressed,
  ] = useState(false)

  const { result: currentResult, error } = useSelector(function (state) {
    return state.display
  })

  const stack = useSelector(function (state) {
    return state.accumulator
  })

  function onClick(target) {
    if (equalButtonPressed) {
      dispatch({ type: ACCUMULATOR_CLEAR })
      setEqualButtonPressed(false)
    }

    // without setImmediate clearing accumulator stack
    // execute after keyboard action handlers and display
    // shows zero which is incorrect. We need show user
    // entered number after calculation (i.e. after equal button click)
    return setImmediate(function () {
      if (isNumberAction(target)) return onNumberButtonClick(target)
      if (isOperatorAction(target)) return onOperatorButtonClick(target)
      return onHelperButtonClick(target)
    })
  }

  function onNumberButtonClick(target) {
    // do nothing if current displayed
    // input length max than MAX_INPUT_LENGTH constant
    const maxInputReached = String(currentResult).length >= MAX_INPUT_LENGTH
    if (maxInputReached && !expressionCalculated) return

    if (error) setEqualButtonPressed(true)

    setIsLastOperationButtonPressed(false)

    // in case of user pressed digit button and current
    // display input is integer, simply add selected digit
    // to back of current number
    if (error || Number.isInteger(currentResult)) {
      let payload = { result: currentResult * 10 + target.id }
      if (expressionCalculated) {
        payload = { result: target.id, error: '' }
        setExpressionCalculated(false)
      }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // in case if user pressed digit button and current display
    // number is floating point, simply put entered digit to
    // back of current number
    if (error || !Number.isInteger(currentResult)) {
      let payload = { result: currentResult + '' + target.id }
      if (expressionCalculated) {
        payload = { result: target.id, error: '' }
        setExpressionCalculated(false)
      }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }
  }

  function onHelperButtonClick(target) {
    if (target.id === buttons.BTN_SIGN && Number(currentResult) !== 0) {
      // swap sign
      const payload = { result: -1 * currentResult }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // cancel last user entered input (number)
    // if CE (Cancel Entry) button pressed
    if (target.id === buttons.BTN_CANCEL_ENTRY) {
      const payload = { result: 0, error: 0 }
      return dispatch({ type: SET_DISPLAY_RESULT, payload })
    }

    // clear display and stack if C (Clear) button pressed
    if (target.id === buttons.BTN_CLEAR) {
      dispatch({ type: ACCUMULATOR_CLEAR })
      const payload = { result: 0, error: '' }
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

  function onOperatorButtonClick(target) {
    if (target.id === buttons.BTN_EQUAL) {
      setEqualButtonPressed(true)
    }

    if (isLastOperationButtonPressed && !isUnaryOperator(target)) {
      setIsLastOperationButtonPressed(true)

      const lastItem = stack[stack.length - 1]

      return dispatch({
        type: ACCUMULATOR_REPLACE_LAST,
        payload: {
          operand: lastItem.operand,
          operator: target,
        },
      })
    }

    setExpressionCalculated(true)
    setIsLastOperationButtonPressed(true)

    // push last user action action into accumulator
    dispatch({
      type: ACCUMULATOR_PUSH,
      payload: {
        operand: currentResult,
        operator: target,
      },
    })
  }

  return <Keyboard onClick={onClick} />
}
