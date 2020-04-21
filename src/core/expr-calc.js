import MathCalc from '../lib/mathcalc'

const math = new MathCalc()

export function calc(expression) {
  return math.parse(expression).eval()
}
