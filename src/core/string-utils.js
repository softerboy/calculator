export function format(input) {
  let [integer] = input.split('.')
  const hasSign = integer[0] === '-'

  if (hasSign) integer = integer.substr(1)

  const formatted = reverse(
    reverse(integer)
      .match(/.{1,3}/g)
      .join(),
  )

  const index = input.indexOf('.')
  const floating = index > -1 ? input.substr(index) : ''
  const result = floating ? formatted + floating : formatted
  return hasSign ? '-' + result : result
}

function reverse(str) {
  return str.split('').reverse().join('')
}

export function unformat(input) {
  return String(input).replace(/,/g, '')
}

/**
 * Removes scientific number floating point without changing it's value
 * For example 1.23456e+12 becomes 123456e+7
 * @param input
 * @returns {string}
 */
export function movePrecision(input) {
  let str = typeof input === 'string' ? input : '' + input

  if (!(str.indexOf('.') > -1 && str.indexOf('e') > -1)) {
    return str
  }

  const pointIndex = str.indexOf('.')
  const indexOfE = str.indexOf('e')
  const { length } = str.substring(pointIndex + 1, indexOfE)
  const base = str.substring(0, indexOfE + 2)
  const mantissa = str.substring(indexOfE + 1)
  return base.replace('.', '') + Math.abs(Number(mantissa) - Number(length))
}
