import React from 'react'

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

import HistoryState from './HistoryState'

export default function RightTabs() {
  return (
    <Tabs id="rightTab" defaultActiveKey="history">
      <Tab
        title="History"
        eventKey="history"
        className="text-white text-right history-tab-content"
        tabClassName="right-tab"
      >
        <HistoryState />
      </Tab>
      {/*<Tab*/}
      {/*  title="Memory"*/}
      {/*  eventKey="memory"*/}
      {/*  className="text-white text-right"*/}
      {/*  tabClassName="right-tab"*/}
      {/*>*/}
      {/*  /!* TODO: put memory widget here *!/*/}
      {/*  <h3>50</h3>*/}
      {/*</Tab>*/}
    </Tabs>
  )
}
