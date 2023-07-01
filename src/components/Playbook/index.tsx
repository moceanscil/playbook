'use client'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import Resources from './Resources'
import Start from './Start'
import Urgency from './Urgency'

const rootStyle = {
  display: 'grid',
  gridTemplateAreas: '"main"',
}

export default function Playbook() {
  return (
    <div style={rootStyle}>
      <Start />
      <County />
      <AreaOfNeed />
      <Urgency />
      <Resources />
    </div>
  )
}
