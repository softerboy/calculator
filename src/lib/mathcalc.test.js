import MathCalc from './mathcalc'

describe('MathCalc Library', function () {
  it('should export itself as a node module', function () {
    const calc = new MathCalc()
    const expression = calc.parse('2 + 2 + sqrt(81)')
    const result = expression.eval()
    expect(result).toBe(13)
  })
})
