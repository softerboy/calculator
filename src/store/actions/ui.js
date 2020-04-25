import {
  UI_HIDE_MOBILE_HISTORY_PANEL,
  UI_SHOW_MOBILE_HISTORY_PANEL,
  UI_TOGGLE_MOBILE_HISTORY_PANEL,
} from '../action-types'

export function hideMobileHistoryPanel() {
  return { type: UI_HIDE_MOBILE_HISTORY_PANEL }
}

export function showMobileHistoryPanel() {
  return { type: UI_SHOW_MOBILE_HISTORY_PANEL }
}

export function toggleMobileHistoryPanel() {
  return { type: UI_TOGGLE_MOBILE_HISTORY_PANEL }
}
