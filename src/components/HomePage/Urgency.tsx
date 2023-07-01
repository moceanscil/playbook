import { useSearchParams } from 'next/navigation'

import LinkButton from './LinkButton'
import Step from './Step'

const URGENCY_LEVELS = [
  { label: '6 hours', value: 6 },
  { label: '24 hours', value: 24 },
  { label: '3 days', value: 72 },
]

export default function Urgency() {
  const searchParams = useSearchParams()
  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string

  return (
    <Step title="How urgently does this person need help?">
      {URGENCY_LEVELS.map(urgency => (
        <LinkButton
          key={urgency.value}
          query={{
            step: 'neighbor',
            county,
            need,
            urgency: urgency.value.toString(),
          }}
        >
          {urgency.label}
        </LinkButton>
      ))}
    </Step>
  )
}
