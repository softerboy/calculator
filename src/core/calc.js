import MathCalc from '../lib/mathcalc'

const math = new MathCalc()

export default function calc(expression) {
  const expr = math.parse(String(expression))
  const res = expr.eval()

  if (expr.scope.runtimeError) {
    const { text } = expr.scope.runtimeError
    if (/Division by zero/.test(text)) {
      return Infinity
    }
  }

  return res && res.toString()
}
