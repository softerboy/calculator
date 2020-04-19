import { buttons, htmlSymbols } from '../common/constants'

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
  ]

  return operators.includes(target.id)
}

export function isUnaryOperator(target) {
  return [
    buttons.BTN_PERCENT,
    buttons.BTN_ONE_DIVIDE_BY,
    buttons.BTN_SQUARE,
    buttons.BTN_SQUARE_ROOT,
  ].includes(target.id)
}

export function formatUnaryOperation(operator, operand) {
  if (operator.id === buttons.BTN_SQUARE_ROOT) {
    return '&#8730; (' + operand + ')'
  } else if (operator.id === buttons.BTN_SQUARE) {
    return 'sqr(' + operand + ')'
  } else if (operator.id === buttons.BTN_ONE_DIVIDE_BY) {
    return '1 / (' + operand + ')'
  } else if (operator.id === buttons.BTN_PERCENT) {
    return Number(operand) / 100
  }
}

export function formatOperation(operator, operand) {
  if (isUnaryOperator(operator)) return formatUnaryOperation(operator, operand)
  return formatBinaryOperation(operator, operand)
}

export function formatBinaryOperation(operator, operand) {
  if (operator.id === buttons.BTN_ADD) {
    return operand + ' ' + htmlSymbols.PLUS
  } else if (operator.id === buttons.BTN_SUBTRACT) {
    return operand + ' ' + htmlSymbols.MINUS
  } else if (operator.id === buttons.BTN_DIVIDE) {
    return operand + ' ' + htmlSymbols.DIVIDE
  } else if (operator.id === buttons.BTN_MULTIPLY) {
    return operand + ' ' + htmlSymbols.MULTIPLY
  }
}

// generates expression string from user entered operations
export function expressionFrom(stack) {
  if (stack.length === 0) return ''

  if (stack.length === 1) {
    const { operator, operand } = stack[0]
    return formatOperation(operator, operand)
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
      return expressionFrom(first) + expressionFrom(second)
    }

    // in two binary expression, one before will be operand of last
    return formatOperation(last.operator, expressionFrom(stack.slice(0, -1)))
  }

  if (isUnaryOperator(last.operator) && !isUnaryOperator(beforeLast.operator)) {
    return (
      expressionFrom(stack.slice(0, -1)) +
      formatOperation(last.operator, last.operand)
    )
  }

  if (!isUnaryOperator(last.operator) && isUnaryOperator(beforeLast.operator)) {
    return formatOperation(last.operator, expressionFrom(stack.slice(0, -1)))
  }

  return formatOperation(
    last.operator,
    expressionFrom(stack.slice(0, -1)) + ' ' + last.operand,
  )
}

export function resultFrom(/*stack*/) {
  // calculate result
}
