import calc from './calc'
import { buttons } from '../common/constants'
import mathcalcFormatter from './formatter/mathcalc'
import { formatOperation, isUnaryOperator } from './util'

// generates expression string from user entered operations
export function expressionFrom(stack, formatter) {
  if (stack.length === 0) return ''

  if (stack.length === 1) {
    const { operator, operand } = stack[0]
    return formatOperation(operator, operand, formatter)
  }

  const last = stack[stack.length - 1]
  const beforeLast = stack[stack.length - 2]

  if (isUnaryOperator(last.operator) && isUnaryOperator(beforeLast.operator)) {
    // find last index of binary operation in stack
    // here slice used to copy stack to new array, without it
    // reverse() call will mutate original stack
    const index = stack
      .slice()
      .reverse()
      .findIndex(function (element) {
        return !isUnaryOperator(element.operator)
      })

    // if operation stack contains mix of binary and unary operations,
    // divide them from last binary operation index and calculate expression
    // for each and last simply concatenate them (divide and conquer principle)
    if (index > -1) {
      const lastBinaryIndex = stack.length - index
      const first = stack.slice(0, lastBinaryIndex)
      const second = stack.slice(lastBinaryIndex)
      return (
        expressionFrom(first, formatter) + expressionFrom(second, formatter)
      )
    }

    // in two binary expression, one before will be operand of last
    return formatOperation(
      last.operator,
      expressionFrom(stack.slice(0, -1), formatter),
      formatter,
    )
  }

  if (isUnaryOperator(last.operator) && !isUnaryOperator(beforeLast.operator)) {
    return (
      expressionFrom(stack.slice(0, -1), formatter) +
      formatOperation(last.operator, last.operand, formatter)
    )
  }

  if (!isUnaryOperator(last.operator) && isUnaryOperator(beforeLast.operator)) {
    return formatOperation(
      last.operator,
      expressionFrom(stack.slice(0, -1), formatter),
      formatter,
    )
  }

  return formatOperation(
    last.operator,
    expressionFrom(stack.slice(0, -1), formatter) + ' ' + last.operand,
    formatter,
  )
}

// returns current expression result on the display
export function resultFrom(stack) {
  // return 0 (zero) if accumulator stack is empty
  if (!stack.length) return 0

  const lastOperation = stack[stack.length - 1]

  // in case user just pressed equal button on empty screen
  // simply return entered number
  if (stack.length === 1 && lastOperation.operator.id === buttons.BTN_EQUAL) {
    return lastOperation.operand
  }

  // in case of last operator is unary,
  // simply calculate expression
  const expression = expressionFrom(stack, mathcalcFormatter)
  if (isUnaryOperator(lastOperation.operator)) {
    return calc(expression)
  }

  // otherwise remove one of last +, -, *, / sign and calculate expression
  return calc(expression.slice(0, -1))
}
