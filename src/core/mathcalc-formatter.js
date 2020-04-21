/**
 * Converts mathematical expression into mathcalc.js
 * understandable format.
 *
 * For more information about mathcalc.js refer to:
 * https://paiv.github.io/blog/2016/03/23/js-calc.html
 */
export default {
  oneDividedBy(operand) {
    return '1 / (' + operand + ')'
  },

  square(operand) {
    return operand + '^2'
  },

  squareRoot(operand) {
    return 'sqrt(' + operand + ')'
  },

  percent(operand) {
    return String(Number(operand) / 100)
  },

  divide(operand) {
    return operand + '/'
  },

  multiply(operand) {
    return operand + '*'
  },

  subtract(operand) {
    return operand + '-'
  },

  add(operand) {
    return operand + '+'
  },

  equal(operand) {
    return operand
  },
}
