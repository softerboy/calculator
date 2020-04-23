import { buttons } from '../common/constants'

export function hasFloatingPoint(number) {
  return String(number).indexOf('.') > -1
}

export function toFixedNumber(num, digits, base) {
  const pow = Math.pow(base || 10, digits)
  return Math.round(num * pow) / pow
}

export function isNumberAction(operator) {
  return operator >= buttons.BTN_NUM_ZERO && operator <= buttons.BTN_NUM_NINE
}

export function isOperatorAction(operator) {
  const operators = [
    buttons.BTN_PERCENT,
    buttons.BTN_ONE_DIVIDE_BY,
    buttons.BTN_SQUARE,
    buttons.BTN_SQUARE_ROOT,
    buttons.BTN_DIVIDE,
    buttons.BTN_MULTIPLY,
    buttons.BTN_SUBTRACT,
    buttons.BTN_ADD,
    buttons.BTN_EQUAL,
  ]

  return operators.includes(operator)
}

export function isUnaryOperator(operator) {
  return [
    buttons.BTN_PERCENT,
    buttons.BTN_ONE_DIVIDE_BY,
    buttons.BTN_SQUARE,
    buttons.BTN_SQUARE_ROOT,
    buttons.BTN_EQUAL,
  ].includes(operator)
}

export function formatOperation(operator, operand, formatter) {
  if (operator === buttons.BTN_SQUARE_ROOT) {
    return formatter.squareRoot(operand)
  }

  if (operator === buttons.BTN_SQUARE) {
    return formatter.square(operand)
  }

  if (operator === buttons.BTN_ONE_DIVIDE_BY) {
    return formatter.oneDividedBy(operand)
  }

  if (operator === buttons.BTN_PERCENT) {
    return formatter.percent(operand)
  }

  if (operator === buttons.BTN_EQUAL) {
    return formatter.equal(operand)
  }

  if (operator === buttons.BTN_ADD) {
    return formatter.add(operand)
  }

  if (operator === buttons.BTN_SUBTRACT) {
    return formatter.subtract(operand)
  }

  if (operator === buttons.BTN_DIVIDE) {
    return formatter.divide(operand)
  }

  if (operator === buttons.BTN_MULTIPLY) {
    return formatter.multiply(operand)
  }

  throw new Error('No formatter method found for operator ' + operator)
}
