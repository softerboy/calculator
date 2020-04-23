import { buttons } from '../common/constants'
import Calculator from './calculator-simulator'

describe('Calculator', function () {
  // =========== addition =============//
  it('should add two numbers', function () {
    const integerAddition = Calculator.newInstance()
      .click(12, buttons.BTN_ADD)
      .click(8, buttons.BTN_EQUAL)
      .calculate()
    expect(integerAddition).toBe('20')

    const floatingPointAddition = Calculator.newInstance()
      .click(12.5, buttons.BTN_ADD)
      .click(3.5, buttons.BTN_EQUAL)
      .calculate()
    expect(floatingPointAddition).toBe('16')
  })

  // ============= subtracting two numbers ============= //
  it('should subtract two numbers', function () {
    const integerSubtraction = Calculator.newInstance()
      .click(12, buttons.BTN_SUBTRACT)
      .click(8, buttons.BTN_EQUAL)
      .calculate()
    expect(integerSubtraction).toBe('4')

    const floatingPointSubtraction = Calculator.newInstance()
      .click(12.5, buttons.BTN_SUBTRACT)
      .click(3.5, buttons.BTN_EQUAL)
      .calculate()
    expect(floatingPointSubtraction).toBe('9')
  })

  // ========== multiplying ============== //
  it('should multiply two numbers', function () {
    const integerMultiplication = Calculator.newInstance()
      .click(12, buttons.BTN_MULTIPLY)
      .click(8, buttons.BTN_EQUAL)
      .calculate()
    expect(integerMultiplication).toBe('96')

    const floatingPointMultiplication = Calculator.newInstance()
      .click(12.5, buttons.BTN_MULTIPLY)
      .click(3.5, buttons.BTN_EQUAL)
      .calculate()
    expect(floatingPointMultiplication).toBe('43.75')
  })

  // ========= dividing ================== //
  it('should divide two numbers', function () {
    const integerDividing = Calculator.newInstance()
      .click(12, buttons.BTN_DIVIDE)
      .click(8, buttons.BTN_EQUAL)
      .calculate()
    expect(integerDividing).toBe('1.5')

    const floatingPointDividing = Calculator.newInstance()
      .click(8.4, buttons.BTN_DIVIDE)
      .click(3, buttons.BTN_EQUAL)
      .calculate()
    expect(floatingPointDividing).toBe('2.8')
  })

  // ========== divide by zero ==================
  it('should return Infinity for divide by zero', function () {
    const divideByZeroResult = Calculator.newInstance()
      .click(34, buttons.BTN_DIVIDE)
      .click(0, buttons.BTN_EQUAL)
      .calculate()

    expect(isFinite(divideByZeroResult)).toBe(false)
  })

  // ===================== invalid argument ===========//
  it('should return NaN for invalid arguments', function () {
    const invalidArgumentResult = Calculator.newInstance()
      // square root argument cannot be negative
      .click(-100, buttons.BTN_SQUARE_ROOT)
      .click(buttons.BTN_EQUAL)
      .calculate()

    expect(isNaN(invalidArgumentResult)).toBe(true)
  })

  it('should calculate difficult expressions', function () {
    // here's an example calculating some difficult expression like:
    // sqrt(81) - 1 / 8
    const difficultExpressionResult = Calculator.newInstance()
      // first click on num 8, num 1, and square root buttons
      .click(81, buttons.BTN_SQUARE_ROOT)
      // then click on subtract (minus) buttons
      .click(buttons.BTN_SUBTRACT)
      // then click on 8 and 1/x buttons
      .click(8, buttons.BTN_ONE_DIVIDE_BY)
      // and last click on equal button
      .click(buttons.BTN_EQUAL)
      // And voila ;-)
      // get the display result
      .calculate()

    expect(difficultExpressionResult).toBe('8.875')
  })
})
