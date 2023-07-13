'use client'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import PlaybookContext from './PlaybookContext'
import Resources from './Resources'

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
      <div style={rootStyle}>
        <County />
        <AreaOfNeed />
        {/* Commented out until we've decided what to do re: urgency options */}
        {/* <Urgency /> */}
        <Resources />
      </div>
    </PlaybookContext.Provider>
  )
}
