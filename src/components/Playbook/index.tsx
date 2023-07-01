'use client'

import { useSearchParams } from 'next/navigation'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import Resources from './Resources'
import Start from './Start'
import StepContext from './StepContext'
import Urgency from './Urgency'

const rootStyle = {
  display: 'grid',
  gridTemplateAreas: '"main"',
}

export default function Playbook() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const county = searchParams.get('county')
  const need = searchParams.get('need')
  const urgency = searchParams.get('urgency')

  const currentStep =
    action === 'neighbor' && county && need && urgency
      ? 'Resources'
      : action === 'neighbor' && county && need
      ? 'Urgency'
      : action === 'neighbor' && county
      ? 'AreaOfNeed'
      : action === 'neighbor'
      ? 'County'
      : 'Start'

  return (
    <div style={rootStyle}>
      <StepContext.Provider value={{ currentStep }}>
        <Start />
        <County />
        <AreaOfNeed />
        <Urgency />
        <Resources />
      </StepContext.Provider>
    </div>
  )
}
