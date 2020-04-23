import MathCalc from '../lib/mathcalc'

const math = new MathCalc()

export default function calc(expression) {
  return math.parse(String(expression)).eval()
}
