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
