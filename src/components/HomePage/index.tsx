'use client'

import { useSearchParams } from 'next/navigation'

import AreaOfNeed from './AreaOfNeed'
import Neighbor from './Neighbor'
import Resources from './Resources'
import Start from './Start'
import Urgency from './Urgency'

export default function HomePage() {
  const searchParams = useSearchParams()
  const step = searchParams.get('step')
  const county = searchParams.get('county')
  const need = searchParams.get('need')
  const urgency = searchParams.get('urgency')

  if (step === 'neighbor' && county && need && urgency) return <Resources />
  if (step === 'neighbor' && county && need) return <Urgency />
  if (step === 'neighbor' && county) return <AreaOfNeed />
  if (step === 'neighbor') return <Neighbor />
  if (!step) return <Start />
}
