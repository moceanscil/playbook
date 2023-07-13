'use client'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import PlaybookContext from './PlaybookContext'
import Report from './Report'
import Resources from './Resources'
import { ResourcesContextProvider } from '../ResourcesContext'

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
          <County />
          <AreaOfNeed />
          {/* Commented out until we've decided what to do re: urgency options */}
          {/* <Urgency /> */}
          <Resources />
          <Report />
        </div>
      </ResourcesContextProvider>
    </PlaybookContext.Provider>
  )
}
