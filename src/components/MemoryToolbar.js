import React from 'react'
import PropTypes from 'prop-types'

import Button from 'react-bootstrap/Button'

import buttons from '../common/memory-buttons'

export default function MemoryToolbar(props) {
  function renderButton(button) {
    return (
      <Button
        key={button.id}
        onClick={props.onClick.bind(this, button)}
        dangerouslySetInnerHTML={{ __html: button.symbol }}
        className="float-left rounded-0 pl-4 pr-4 pt-3 pb-3 memory-button"
      />
    )
  }

  return buttons.map(renderButton)
}

MemoryToolbar.propTypes = {
  onClick: PropTypes.func,
}

MemoryToolbar.defaultProps = {
  onClick: function () {}, // noop
}
