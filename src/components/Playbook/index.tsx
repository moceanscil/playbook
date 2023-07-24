'use client'

import AreaOfNeed from './help/AreaOfNeed'
import County from './help/County'
import Eligibility from './help/Eligibility'
import PlaybookContext from './help/PlaybookContext'
import Report from './help/Report'
import Resources from './help/Resources'
import { ResourcesContextProvider } from './help/ResourcesContext'
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
