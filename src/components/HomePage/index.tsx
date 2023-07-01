'use client'

import { useSearchParams } from 'next/navigation'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import Resources from './Resources'
import Start from './Start'
import Urgency from './Urgency'

export default function HomePage() {
  const searchParams = useSearchParams()
  const action = searchParams.get('action')
  const county = searchParams.get('county')
  const need = searchParams.get('need')
  const urgency = searchParams.get('urgency')

  if (action === 'neighbor' && county && need && urgency) return <Resources />
  if (action === 'neighbor' && county && need) return <Urgency />
  if (action === 'neighbor' && county) return <AreaOfNeed />
  if (action === 'neighbor') return <County />
  if (!action) return <Start />
}
