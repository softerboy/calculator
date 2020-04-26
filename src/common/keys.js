import { buttons, icons } from './constants'

export default [
  [
    { shortcut: 'p', symbol: icons.PERCENT, id: buttons.BTN_PERCENT },
    { shortcut: 'c e', symbol: 'CE', id: buttons.BTN_CANCEL_ENTRY },
    { shortcut: 'c c', symbol: 'C', id: buttons.BTN_CLEAR },
    // eslint-disable-next-line
    {
      shortcut: ['del', 'backspace'],
      symbol: icons.BACKSPACE,
      id: buttons.BTN_REMOVE,
    },
  ],
  [
    // eslint-disable-next-line
    {
      shortcut: 'o',
      symbol: icons.ONE_DIVIDE_BY,
      id: buttons.BTN_ONE_DIVIDE_BY,
    },
    { shortcut: 's r', symbol: icons.SQUARE, id: buttons.BTN_SQUARE },
    // eslint-disable-next-line
    { shortcut: 's t', symbol: icons.SQUARE_ROOT, id: buttons.BTN_SQUARE_ROOT },
    { shortcut: 'd', symbol: icons.DIVIDE, id: buttons.BTN_DIVIDE },
  ],
  [
    { shortcut: '7', symbol: '7', id: buttons.BTN_NUM_SEVEN },
    { shortcut: '8', symbol: '8', id: buttons.BTN_NUM_EIGHT },
    { shortcut: '9', symbol: '9', id: buttons.BTN_NUM_NINE },
    { shortcut: 'm', symbol: icons.MULTIPLY, id: buttons.BTN_MULTIPLY },
  ],
  [
    { shortcut: '4', symbol: '4', id: buttons.BTN_NUM_FOUR },
    { shortcut: '5', symbol: '5', id: buttons.BTN_NUM_FIVE },
    { shortcut: '6', symbol: '6', id: buttons.BTN_NUM_SIX },
    { shortcut: '-', symbol: icons.SUBTRACT, id: buttons.BTN_SUBTRACT },
  ],
  [
    { shortcut: '1', symbol: '1', id: buttons.BTN_NUM_ONE },
    { shortcut: '2', symbol: '2', id: buttons.BTN_NUM_TWO },
    { shortcut: '3', symbol: '3', id: buttons.BTN_NUM_THREE },
    { shortcut: ['a', '+'], symbol: icons.ADD, id: buttons.BTN_ADD },
  ],
  [
    { shortcut: 's g', symbol: icons.SIGN, id: buttons.BTN_SIGN },
    { shortcut: '0', symbol: '0', id: buttons.BTN_NUM_ZERO },
    { shortcut: '.', symbol: icons.POINT, id: buttons.BTN_FLOATING_POINT },
    // eslint-disable-next-line
    {
      shortcut: ['enter', 'space', '='],
      symbol: icons.EQUAL,
      id: buttons.BTN_EQUAL,
    },
  ],
]
