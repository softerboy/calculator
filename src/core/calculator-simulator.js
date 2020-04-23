import { resultFrom } from './accumulator'

/**
 * A helper function for simulating application
 * calculator state which useful in testing
 * @constructor
 */
function CalculatorSimulator() {
  this.stack = []
}

/**
 * Pushes current operation into stack
 * @param {number} operator
 * @param {number|string} [operand]
 * @returns {CalculatorSimulator}
 */
CalculatorSimulator.prototype.click = function (operand, operator) {
  if (arguments.length === 2) {
    this.stack.push({ operator, operand })
    return this
  }

  const prev = resultFrom(this.stack.slice(0, -1))
  this.stack.push({
    operator: arguments[0],
    operand: prev,
  })

  return this
}

/**
 * Calculates current stack
 * @returns {number}
 */
CalculatorSimulator.prototype.calculate = function () {
  return resultFrom(this.stack)
}

/**
 * Creates and returns new calculator instance
 * @returns {CalculatorSimulator}
 */
CalculatorSimulator.newInstance = function () {
  return new CalculatorSimulator()
}

export default CalculatorSimulator
