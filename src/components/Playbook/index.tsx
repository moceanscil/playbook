'use client'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import Eligibility from './Eligibility'
import PlaybookContext from './PlaybookContext'
import Report from './Report'
import Resources from './Resources'
import { ResourcesContextProvider } from '../ResourcesContext'
import Start from './Start'

const rootStyle = {
  display: 'grid',
  gridTemplateAreas: '"main"',
}

export default function Playbook({
  countyServedValues,
  resourceTypeValues,
}: {
  countyServedValues: string[]
  resourceTypeValues: string[]
}) {
  return (
    <PlaybookContext.Provider
      value={{ countyServedValues, resourceTypeValues }}
    >
      <ResourcesContextProvider>
        <div style={rootStyle}>
          <Start />
          <County />
          <AreaOfNeed />
          {/* Commented out until we've decided what to do re: urgency options */}
          {/* <Urgency /> */}
          <Eligibility />
          <Resources />
          <Report />
        </div>
      </ResourcesContextProvider>
    </PlaybookContext.Provider>
  )
}
