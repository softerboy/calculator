import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import RightTabs from './RightTabs'
import HistoryState from './HistoryState'
import DisplayState from './DisplayState'
import MemoryToolbar from './MemoryToolbar'
import KeyboardState from './KeyboardState'
import HistoryToggleButton from './HistoryToggleButton'
import { hideMobileHistoryPanel } from '../store/actions/ui'

export default function MainLayout() {
  const dispatch = useDispatch()

  const { mobileHistoryPanelShown } = useSelector(function (state) {
    return state.ui
  })

  const style = mobileHistoryPanelShown ? { top: 0 } : { top: '100%' }

  function onDisplayClick() {
    if (mobileHistoryPanelShown) dispatch(hideMobileHistoryPanel())
  }

  return (
    <Row className="flex-grow-1" noGutters>
      {/*left col with result display text and buttons*/}
      <Col md={9} className="d-flex flex-column">
        <Row noGutters onClick={onDisplayClick}>
          <Col className="text-white text-right">
            <div className="d-flex justify-content-end">
              <HistoryToggleButton />
            </div>
            <DisplayState />
            <MemoryToolbar />
          </Col>
        </Row>
        <Row className="flex-grow-1 flex-column position-relative" noGutters>
          <Col className="mobile-history" style={style}>
            <HistoryState />
          </Col>
          <Col className="d-flex flex-column flex-grow-1">
            <KeyboardState />
          </Col>
        </Row>
      </Col>

      {/*right col with history and memory tabs*/}
      <Col md={3} className="d-none d-md-block">
        <RightTabs />
      </Col>
    </Row>
  )
}
