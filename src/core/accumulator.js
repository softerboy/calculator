import calc from './calc'
import { buttons } from '../common/constants'
import mathcalcFormatter from './formatter/mathcalc'
import sequentialFormatter from './formatter/sequential'
import { formatOperation, isUnaryOperator } from './util'

// generates expression string from user entered operations
export function expressionFrom(stack, formatter) {
  if (stack.length === 0) return ''
  const { operator, operand } = stack[0]

  if (stack.length === 1) {
    if (operator === buttons.BTN_PERCENT) return '0'
    return formatOperation(operator, operand, formatter)
  }

  const last = stack[stack.length - 1]
  const beforeLast = stack[stack.length - 2]

  // calculate all expression so far, and divide by 100
  if (last.operator === buttons.BTN_PERCENT) {
    const expressionTillPercentOp = calc(
      expressionSequentialFrom(stack.slice(0, -1)),
    )

    const p =
      expressionTillPercentOp +
      seqFmt(
        beforeLast.operator,
        seqFmt(last.operator, expressionTillPercentOp * last.operand),
      )

    return p
  }

  if (isUnaryOperator(last.operator) && isUnaryOperator(beforeLast.operator)) {
    if (last.operator === buttons.BTN_EQUAL) {
      return formatOperation(
        last.operator,
        expressionFrom(stack.slice(0, -1)),
        formatter,
      )
    }
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
export function resultScientificFrom(stack) {
  // return 0 (zero) if accumulator stack is empty
  if (!stack.length) return 0

  const lastOperation = stack[stack.length - 1]

  // in case user just pressed equal button on empty screen
  // simply return entered number
  if (stack.length === 1 && lastOperation.operator === buttons.BTN_EQUAL) {
    return lastOperation.operand
  } else if (
    stack.length === 1 &&
    lastOperation.operator === buttons.BTN_PERCENT
  ) {
    return 0 // we can't calculate percent of single number, there's no any logic
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

export function resultSequentialFrom(stack) {
  // return 0 (zero) if accumulator stack is empty
  if (!stack.length) return 0

  const last = stack[stack.length - 1]

  if (stack.length === 1 && last.operator === buttons.BTN_PERCENT) {
    return 0 // we can't calculate percent of single number, there's no any logic
  }

  const isLastNotEqualBtn = last.operator !== buttons.BTN_EQUAL
  let expr = expressionSequentialFrom(stack)
  const isLastPercentButton = last.operator === buttons.BTN_PERCENT
  if (isLastPercentButton) return calc(expr)

  // display last binary operation result instead whole expr result
  if (isUnaryOperator(last.operator) && isLastNotEqualBtn) {
    expr = seqFmt(last.operator, last.operand)
    return calc(expr)
  }

  return calc(String(expr))
}

/*
 * Implements sequential calculating algorithm
 *
 * Imagine if we have expression in some sequential order, for example:
 *   1 + 4 * 3
 * In scientific calculation, result of above expression must be 13.
 * Because multiplying operator has higher priority than adding operator,
 * but in sequential calculating, result of above expression should be 15.
 * Which is calculated in left to right order
 */
export function expressionSequentialFrom(stack) {
  if (!stack.length) return 0

  let initial = stack[0].operand
  if (isUnaryOperator(stack[0].operator)) {
    initial = calc(seqFmt(stack[0].operator, stack[0].operand))
  }

  return stack.reduce(function (acc, curr, index) {
    if (index === stack.length - 1) return acc
    const first = curr
    const second = stack[index + 1]

    const isFirstUnary = isUnaryOperator(first.operator)
    const isSecondUnary = isUnaryOperator(second.operator)

    // calculate all expression so far, and divide by 100
    if (second.operator === buttons.BTN_PERCENT) {
      const expressionTillPercentOp = calc(
        expressionSequentialFrom(stack.slice(0, -1)),
      )

      const p =
        expressionTillPercentOp +
        seqFmt(
          first.operator,
          seqFmt(second.operator, expressionTillPercentOp * second.operand),
        )

      return p
    }

    if (!isFirstUnary && !isSecondUnary) {
      return wb(acc + seqFmt(first.operator, second.operand))
    } else if (!isFirstUnary && isSecondUnary) {
      return wb(
        acc + seqFmt(first.operator, seqFmt(second.operator, second.operand)),
      )
    } else if (isFirstUnary && !isSecondUnary) {
      // return wb(acc + seqFmt(second.operator, second.operand))
      return wb(calc(expressionSequentialFrom(stack.slice(0, -1))))
    }

    if (second.operator === buttons.BTN_EQUAL) {
      return expressionSequentialFrom(stack.slice(0, -1))
    }

    // find last index of binary operation in stack
    // here slice used to copy stack to new array, without it
    // reverse() call will mutate original stack
    const index2 = stack
      .slice()
      .reverse()
      .findIndex(function (element) {
        return !isUnaryOperator(element.operator)
      })

    // if operation stack contains mix of binary and unary operations,
    // divide them from last binary operation index and calculate expression
    // for each and last simply concatenate them (divide and conquer principle)
    if (index2 > -1) {
      const lastBinaryIndex = stack.length - index
      const firstPart = stack.slice(0, lastBinaryIndex)
      const secondPart = stack.slice(lastBinaryIndex)
      return (
        expressionSequentialFrom(firstPart) +
        seqFmt(
          firstPart[lastBinaryIndex - 1].operator,
          expressionSequentialFrom(secondPart),
        )
      )
    }

    const prev = calc(expressionSequentialFrom(stack.slice(0, -1)))
    return wb(seqFmt(second.operator, prev))
  }, '' + initial)
}

function wb(expr) {
  return '(' + expr + ')'
}

export function resultFrom(stack, scientific = false) {
  if (scientific) return resultScientificFrom(stack)
  return resultSequentialFrom(stack)
}

function seqFmt(operation, operand) {
  if (operation === buttons.BTN_ADD) {
    return sequentialFormatter.add(operand)
  }

  if (operation === buttons.BTN_SUBTRACT) {
    return sequentialFormatter.subtract(operand)
  }

  if (operation === buttons.BTN_MULTIPLY) {
    return sequentialFormatter.multiply(operand)
  }

  if (operation === buttons.BTN_DIVIDE) {
    return sequentialFormatter.divide(operand)
  }

  if (operation === buttons.BTN_ONE_DIVIDE_BY) {
    return sequentialFormatter.oneDividedBy(operand)
  }

  if (operation === buttons.BTN_SQUARE_ROOT) {
    return sequentialFormatter.squareRoot(operand)
  }

  if (operation === buttons.BTN_SQUARE) {
    return sequentialFormatter.square(operand)
  }

  if (operation === buttons.BTN_PERCENT) {
    return sequentialFormatter.percent(operand)
  }

  //
  return operand
  // throw new Error('No formatter method found')
}
