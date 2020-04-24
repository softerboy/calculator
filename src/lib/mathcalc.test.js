import MathCalc from './mathcalc'
import { movePrecision } from '../core/string-utils'

describe('MathCalc Library', function () {
  const calc = new MathCalc()

  it('should export itself as a node module', function () {
    const expression = calc.parse('2 + 2 + sqrt(81)')
    const result = expression.eval().toString()
    expect(result).toBe('13')
  })

  it('should calculate big number', function () {
    const expression = calc.parse(movePrecision('9.999999999999998e+31') + '-9')
    const result = expression.eval().toString()
    expect(result).toBe('9.999999999999997e+31')
  })

  it('should calculate small number', function () {
    const expression = calc.parse('1e+2-9')
    const result = expression.eval().toString()
    expect(result).toBe('91')
  })
})
