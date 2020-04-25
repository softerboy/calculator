import Decimal from 'decimal.js-light'
import React, { useState } from 'react'

import Keyboard from './Keyboard'
import { unformat } from '../core/string-utils'
import { buttons, MAX_DIGIT_COUNT } from '../common/constants'
import { useDispatch, useSelector } from 'react-redux'
import { setDisplayResult } from '../store/actions/display'
import { hasFloatingPoint, isNumberAction, isUnaryOperator } from '../core/util'
import {
  stackClear,
  stackPop,
  stackPush,
  stackReplaceLast,
} from '../store/actions/accumulator'
import { historyPush } from '../store/actions/history'
import { expressionFrom, resultFrom } from '../core/accumulator'

const {
  BTN_SIGN,
  BTN_CLEAR,
  BTN_REMOVE,
  BTN_SUBTRACT,
  BTN_ADD,
  BTN_EQUAL,
  BTN_DIVIDE,
  BTN_MULTIPLY,
  BTN_ONE_DIVIDE_BY,
  BTN_SQUARE_ROOT,
  BTN_SQUARE,
  BTN_PERCENT,
  BTN_FLOATING_POINT,
  BTN_CANCEL_ENTRY,
} = buttons

export default function KeyboardState() {
  const dispatch = useDispatch()
  const [newInputFlag, setNewInputFlag] = useState(true)
  const [resultCalculated, setResultCalculated] = useState(true)

  const display = useSelector(function (state) {
    return state.display
  })

  const stack = useSelector(function (state) {
    return state.accumulator
  })

  const currentResult = unformat(display.result)

  function onClick(button) {
    // whenever user clicks buttons below
    // he would be began from fresh display input
    const newInputButtons = [
      BTN_ADD,
      BTN_CLEAR,
      BTN_EQUAL,
      BTN_DIVIDE,
      BTN_SQUARE,
      BTN_PERCENT,
      BTN_SUBTRACT,
      BTN_MULTIPLY,
      BTN_SQUARE_ROOT,
      BTN_CANCEL_ENTRY,
      BTN_ONE_DIVIDE_BY,
    ]

    setNewInputFlag(newInputButtons.includes(button))

    const resultCalculatedButtons = [
      BTN_EQUAL,
      BTN_SQUARE,
      BTN_SQUARE_ROOT,
      BTN_ONE_DIVIDE_BY,
    ]

    setResultCalculated(resultCalculatedButtons.includes(button))

    if (isNumberAction(button)) return onNumberAction(button)
    return onOperatorAction(button)
  }

  function onNumberAction(button) {
    // do nothing if current input length longer
    // than MAX_DIGIT_COUNT constant
    if (currentResult.length > MAX_DIGIT_COUNT && !newInputFlag) return

    // some of sqrt, 1/x, %, x^2, = buttons pressed before
    if (resultCalculated && stack.length > 1) {
      const { operator } = stack[stack.length - 1]

      if (isUnaryOperator(operator)) {
        const newStack = dispatch(stackPop())
        const newExpression = expressionFrom(newStack)
        return dispatch(setDisplayResult(newExpression, button))
      }
    }

    if (newInputFlag) {
      setNewInputFlag(false)
      if (resultCalculated) {
        dispatch(stackClear())
        return dispatch(setDisplayResult('', button))
      }
      return dispatch(setDisplayResult(display.expression, button))
    }

    let newInput = currentResult + button
    if (!hasFloatingPoint(currentResult)) {
      newInput = new Decimal(currentResult).mul(10).add(button).toString()
    }

    return dispatch(setDisplayResult(display.expression, newInput))
  }

  function onOperatorAction(button) {
    if (button === BTN_FLOATING_POINT) {
      if (resultCalculated) {
        dispatch(stackClear())
        const newInput = newInputFlag ? '0.' : currentResult
        return dispatch(setDisplayResult('', newInput))
      }

      // don't allow user to input floating point sign adding twice
      if (hasFloatingPoint(currentResult)) {
        const newInput = newInputFlag ? '0.' : currentResult
        return dispatch(setDisplayResult(display.expression, newInput))
      }

      // otherwise add '.'
      const newInput = currentResult + '.'
      return dispatch(setDisplayResult(display.expression, newInput))
    }

    if (button === BTN_SIGN) {
      const newInput = new Decimal(currentResult).mul(-1).toString()
      return dispatch(setDisplayResult(display.expression, newInput))
    }

    if (button === BTN_CANCEL_ENTRY) {
      return dispatch(setDisplayResult(display.expression, '0'))
    }

    if (button === BTN_REMOVE) {
      // if the last pressed button before this action was calculating result,
      // remove accumulator stack
      if (resultCalculated) {
        dispatch(stackClear())
        return dispatch(setDisplayResult('', '0'))
      }

      // remove last digit
      const newInput = currentResult.split('').slice(0, -1).join('')
      return dispatch(setDisplayResult(display.expression, newInput || '0'))
    }

    if (button === BTN_CLEAR) {
      dispatch(stackClear())
      return dispatch(setDisplayResult('', '0'))
    }

    if (button === BTN_EQUAL) {
      // show calculated result and expression
      // and clear/reset accumulator stack
      const newStack = dispatch(stackPush(button, currentResult))
      const newResult = resultFrom(newStack)
      const newExpression = expressionFrom(newStack)
      dispatch(setDisplayResult(newExpression, newResult))
      dispatch(historyPush(newExpression, newResult))
      return dispatch(stackClear())
    }

    if (!isUnaryOperator(button) && newInputFlag) {
      const operator = button
      const { operand, operator: oldOperator } = stack[stack.length - 1]
      if (!isUnaryOperator(oldOperator)) {
        const newStack = dispatch(stackReplaceLast(operator, operand))
        const newExpression = expressionFrom(newStack)
        return dispatch(setDisplayResult(newExpression, display.result))
      }
    }

    const newStack = dispatch(stackPush(button, currentResult))
    const newResult = resultFrom(newStack)
    const newExpression = expressionFrom(newStack)
    return dispatch(setDisplayResult(newExpression, newResult))
  }

  return <Keyboard onClick={onClick} />
}
