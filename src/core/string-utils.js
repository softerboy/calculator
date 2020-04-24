export function format(input) {
  const [integer] = input.split('.')

  const formatted = reverse(
    reverse(integer)
      .match(/.{1,3}/g)
      .join(),
  )

  const index = input.indexOf('.')
  const floating = index > -1 ? input.substr(index) : ''
  return floating ? formatted + floating : formatted
}

function reverse(str) {
  return str.split('').reverse().join('')
}

export function unformat(input) {
  return String(input).replace(/,/g, '')
}

export function movePrecision(input) {
  if (!(input.indexOf('.') > -1 && input.indexOf('e') > -1)) {
    return input
  }

  const pointIndex = input.indexOf('.')
  const indexOfE = input.indexOf('e')
  const { length } = input.substring(pointIndex + 1, indexOfE)
  const base = input.substring(0, indexOfE + 2)
  const mantissa = input.substring(indexOfE + 1)
  return base.replace('.', '') + Math.abs(Number(mantissa) - Number(length))
}
