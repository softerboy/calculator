import React from 'react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export default function RightTabs() {
  return (
    <Tabs id="rightTab" defaultActiveKey="history">
      <Tab
        title="History"
        eventKey="history"
        className="text-white text-right"
        tabClassName="right-tab"
      >
        {/* TODO: put history widget here */}
        Display history here
      </Tab>
      <Tab
        title="Memory"
        eventKey="memory"
        className="text-white text-right"
        tabClassName="right-tab"
      >
        {/* TODO: put memory widget here */}
        Display memory here
      </Tab>
    </Tabs>
  )
}
