import {
  UI_HIDE_MOBILE_HISTORY_PANEL,
  UI_SHOW_MOBILE_HISTORY_PANEL,
  UI_TOGGLE_MOBILE_HISTORY_PANEL,
} from '../action-types'

const initialState = {
  mobileHistoryPanelShown: false,
}

export default function ui(state = initialState, action) {
  const { type } = action

  if (type === UI_HIDE_MOBILE_HISTORY_PANEL) {
    return { ...state, mobileHistoryPanelShown: false }
  }

  if (type === UI_SHOW_MOBILE_HISTORY_PANEL) {
    return { ...state, mobileHistoryPanelShown: true }
  }

  if (type === UI_TOGGLE_MOBILE_HISTORY_PANEL) {
    return { ...state, mobileHistoryPanelShown: !state.mobileHistoryPanelShown }
  }

  return state
}
