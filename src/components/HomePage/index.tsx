'use client'

import { useParams } from 'next/navigation'
import Start from './Start'
import Neighbor from './Neighbor'
import AreaOfNeed from './AreaOfNeed'

type Step = 'start' | 'neighbor' | 'neighbor/area-of-need' | 'update'

const getStep = (params: { step?: string }): Step => {
  if (!params.step) return 'start'
  const segments = params.step.split('/')

  if (segments.length === 2 && segments[0] === 'neighbor') {
    return 'neighbor/area-of-need'
  }

  return segments.at(-1)
}

export default function HomePage() {
  const params = useParams()
  const step = getStep(params)

  if (step === 'start') return <Start />
  if (step === 'neighbor') return <Neighbor />
  if (step === 'neighbor/area-of-need') return <AreaOfNeed />
}
