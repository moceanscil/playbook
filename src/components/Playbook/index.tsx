'use client'

import AreaOfNeed from './help/AreaOfNeed'
import County from './help/County'
import Eligibility from './help/Eligibility'
import PlaybookContext from './help/PlaybookContext'
import Report from './help/Report'
import Resources from './help/Resources'
import { ResourcesContextProvider } from './help/ResourcesContext'
import Start from './Start'
import Update from './update/Update'

const rootStyle = {
  display: 'grid',
  gridTemplateAreas: '"main"',
  minHeight: '100%',
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
          <Update />
        </div>
      </ResourcesContextProvider>
    </PlaybookContext.Provider>
  )
}
