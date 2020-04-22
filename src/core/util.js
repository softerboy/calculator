import { buttons } from '../common/constants'

export function toFixedNumber(num, digits, base) {
  const pow = Math.pow(base || 10, digits)
  return Math.round(num * pow) / pow
}

export function isNumberAction(button) {
  const { id } = button
  return id >= buttons.BTN_NUM_ZERO && id <= buttons.BTN_NUM_NINE
}

export function isOperatorAction(target) {
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

  return operators.includes(target.id)
}

export function isUnaryOperator(target) {
  return [
    buttons.BTN_PERCENT,
    buttons.BTN_ONE_DIVIDE_BY,
    buttons.BTN_SQUARE,
    buttons.BTN_SQUARE_ROOT,
    buttons.BTN_EQUAL,
  ].includes(target.id)
}

export function formatOperation(operator, operand, formatter) {
  if (operator.id === buttons.BTN_SQUARE_ROOT) {
    return formatter.squareRoot(operand)
  }

  if (operator.id === buttons.BTN_SQUARE) {
    return formatter.square(operand)
  }

  if (operator.id === buttons.BTN_ONE_DIVIDE_BY) {
    return formatter.oneDividedBy(operand)
  }

  if (operator.id === buttons.BTN_PERCENT) {
    return formatter.percent(operand)
  }

  if (operator.id === buttons.BTN_EQUAL) {
    return formatter.equal(operand)
  }

  if (operator.id === buttons.BTN_ADD) {
    return formatter.add(operand)
  }

  if (operator.id === buttons.BTN_SUBTRACT) {
    return formatter.subtract(operand)
  }

  if (operator.id === buttons.BTN_DIVIDE) {
    return formatter.divide(operand)
  }

  if (operator.id === buttons.BTN_MULTIPLY) {
    return formatter.multiply(operand)
  }

  throw new Error('No formatter method found for operator ' + operator.id)
}
