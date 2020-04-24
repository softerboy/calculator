import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Keyboard from './Keyboard'
import { buttons, MAX_DIGIT_COUNT } from '../common/constants'
import {
  hasFloatingPoint,
  isNumberAction,
  isOperatorAction,
  isUnaryOperator,
} from '../core/util'
import Decimal from 'decimal.js-light'
import { unformat } from '../core/string-utils'
import {
  stackClear,
  stackPush,
  stackReplaceLast,
} from '../store/actions/accumulator'
import { setDisplayResult } from '../store/actions/display'
import { expressionFrom, resultFrom } from '../core/accumulator'

export default function KeyboardState() {
  const dispatch = useDispatch()
  const [equalButtonPressed, setEqualButtonPressed] = useState(false)
  const [expressionCalculated, setExpressionCalculated] = useState(false)
  const [
    isLastOperationButtonPressed,
    setIsLastOperationButtonPressed,
  ] = useState(false)

  const { result: formattedResult, error } = useSelector(function (state) {
    return state.display
  })

  const stack = useSelector(function (state) {
    return state.accumulator
  })

  const currentResult = unformat(formattedResult)

  function onClick(target) {
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
    let newStack = stack
    if (equalButtonPressed) {
      newStack = dispatch(stackClear())
      setEqualButtonPressed(false)
    }

    // do nothing if current displayed
    // input length max than MAX_INPUT_LENGTH constant
    const maxInputReached = String(currentResult).length >= MAX_DIGIT_COUNT
    if (maxInputReached && !expressionCalculated) return

    if (error) setEqualButtonPressed(true)

    setIsLastOperationButtonPressed(false)

    // in case of user pressed digit button and current
    // display input is integer, simply add selected digit
    // to back of current number
    if (error || !hasFloatingPoint(currentResult)) {
      const expression = expressionFrom(newStack)

      if (expressionCalculated) {
        setExpressionCalculated(false)
        return dispatch(setDisplayResult(expression, target))
      }

      const result = new Decimal(currentResult).mul(10).add(target).toString()
      return dispatch(setDisplayResult(expression, result))
    }

    // in case if user pressed digit button and current display
    // number is floating point, simply put entered digit to
    // back of current number
    if (error || hasFloatingPoint(currentResult)) {
      const expression = expressionFrom(newStack)

      if (expressionCalculated && isLastOperationButtonPressed) {
        setExpressionCalculated(false)
        return dispatch(setDisplayResult(expression, target))
      }

      return dispatch(setDisplayResult(expression, currentResult + '' + target))
    }
  }

  function onHelperButtonClick(target) {
    if (target === buttons.BTN_SIGN && currentResult !== '0') {
      const expression = expressionFrom(stack)
      // swap sign
      const result = new Decimal(currentResult).mul(-1).toString()
      return dispatch(setDisplayResult(expression, result))
    }

    // cancel last user entered input (number)
    // if CE (Cancel Entry) button pressed
    if (target === buttons.BTN_CANCEL_ENTRY) {
      const expression = expressionFrom(stack)
      return dispatch(setDisplayResult(expression, '0'))
    }

    // clear display and stack if C (Clear) button pressed
    if (target === buttons.BTN_CLEAR) {
      dispatch(stackClear())
      return dispatch(setDisplayResult('', '0'))
    }

    if (target === buttons.BTN_FLOATING_POINT && expressionCalculated) {
      setExpressionCalculated(false)
      const expression = expressionFrom(stack)
      return dispatch(setDisplayResult(expression, '0.'))
    }

    // in case of pressing floating point button, check is current
    // display input integer or floating point number already
    // We no need to add floating point twice if already exist in
    // current display input
    const inputNotContainsPoint = String(currentResult).indexOf('.') < 0
    if (target === buttons.BTN_FLOATING_POINT && inputNotContainsPoint) {
      const result = currentResult + '.'
      const expression = expressionFrom(stack)
      return dispatch(setDisplayResult(expression, result))
    }

    // if user entered Remove button simply remove last entered
    // digit or floating point from display
    if (target === buttons.BTN_REMOVE) {
      if (isLastOperationButtonPressed) return

      if (expressionCalculated) {
        dispatch(stackClear())
        return dispatch(setDisplayResult('', currentResult))
      }

      const resultCharArray = String(currentResult).split('')
      const expression = expressionFrom(stack)
      if (resultCharArray.length === 1) {
        return dispatch(setDisplayResult(expression, '0'))
      }

      if (resultCharArray.length === 2 && resultCharArray[0] === '-') {
        return dispatch(setDisplayResult(expression, '0'))
      }

      const result = resultCharArray.slice(0, -1).join('')
      return dispatch(setDisplayResult(expression, result))
    }
  }

  function onOperatorButtonClick(target) {
    if (target === buttons.BTN_EQUAL) {
      setEqualButtonPressed(true)
    }

    if (isLastOperationButtonPressed && !isUnaryOperator(target)) {
      setIsLastOperationButtonPressed(true)

      if (stack.length) {
        const { operand } = stack[stack.length - 1]

        const newStack = dispatch(stackReplaceLast(target, operand))
        const expression = expressionFrom(newStack)
        const result = resultFrom(newStack)
        return dispatch(setDisplayResult(expression, result))
      }
    }

    setExpressionCalculated(true)
    if (!isUnaryOperator(target)) setIsLastOperationButtonPressed(true)

    // push last user action action into accumulator
    const newStack = dispatch(stackPush(target, currentResult))
    const expression = expressionFrom(newStack)
    const result = resultFrom(newStack)
    return dispatch(setDisplayResult(expression, result))
  }

  return <Keyboard onClick={onClick} />
}
