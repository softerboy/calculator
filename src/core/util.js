import { buttons } from '../common/constants'

export { buttons } from '../common/constants'

export function toFixedNumber(num, digits, base) {
  const pow = Math.pow(base || 10, digits)
  return Math.round(num * pow) / pow
}

export function isNumberAction(button) {
  const { id } = button
  return id >= buttons.BTN_NUM_ZERO && id <= buttons.BTN_NUM_NINE
}
