import { buttons, icons } from './constants'

export default [
  [
    { symbol: icons.PERCENT, id: buttons.BTN_PERCENT },
    { symbol: 'CE', id: buttons.BTN_CANCEL_ENTRY },
    { symbol: 'C', id: buttons.BTN_CLEAR },
    { symbol: icons.BACKSPACE, id: buttons.BTN_REMOVE },
  ],
  [
    { symbol: icons.ONE_DIVIDE_BY, id: buttons.BTN_ONE_DIVIDE_BY },
    { symbol: icons.SQUARE, id: buttons.BTN_SQUARE },
    { symbol: icons.SQUARE_ROOT, id: buttons.BTN_SQUARE_ROOT },
    { symbol: icons.DIVIDE, id: buttons.BTN_DIVIDE },
  ],
  [
    { symbol: '7', id: buttons.BTN_NUM_SEVEN },
    { symbol: '8', id: buttons.BTN_NUM_EIGHT },
    { symbol: '9', id: buttons.BTN_NUM_NINE },
    { symbol: icons.MULTIPLY, id: buttons.BTN_MULTIPLY },
  ],
  [
    { symbol: '4', id: buttons.BTN_NUM_FOUR },
    { symbol: '5', id: buttons.BTN_NUM_FIVE },
    { symbol: '6', id: buttons.BTN_NUM_SIX },
    { symbol: icons.SUBTRACT, id: buttons.BTN_SUBTRACT },
  ],
  [
    { symbol: '1', id: buttons.BTN_NUM_ONE },
    { symbol: '2', id: buttons.BTN_NUM_TWO },
    { symbol: '3', id: buttons.BTN_NUM_THREE },
    { symbol: icons.ADD, id: buttons.BTN_ADD },
  ],
  [
    { symbol: icons.SIGN, id: buttons.BTN_SIGN },
    { symbol: '0', id: buttons.BTN_NUM_ZERO },
    { symbol: icons.POINT, id: buttons.BTN_FLOATING_POINT },
    { symbol: icons.EQUAL, id: buttons.BTN_EQUAL },
  ],
]
