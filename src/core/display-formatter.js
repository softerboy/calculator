import { htmlSymbols } from '../common/constants'

/**
 * Converts mathematical expression into user readable
 * string using some html symbols
 */
export default {
  oneDividedBy(operand) {
    return ' 1 / (' + operand + ')'
  },

  square(operand) {
    return ' sqr(' + operand + ')'
  },

  squareRoot(operand) {
    return ' ' + htmlSymbols.SQUARE_ROOT + '(' + operand + ')'
  },

  percent(operand) {
    return String(Number(operand) / 100)
  },

  divide(operand) {
    return operand + ' ' + htmlSymbols.DIVIDE
  },

  multiply(operand) {
    return operand + ' ' + htmlSymbols.MULTIPLY
  },

  subtract(operand) {
    return operand + ' ' + htmlSymbols.MINUS
  },

  add(operand) {
    return operand + ' ' + htmlSymbols.PLUS
  },
}
