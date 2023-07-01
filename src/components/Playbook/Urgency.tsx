import { useSearchParams } from 'next/navigation'

import LinkButton from './LinkButton'
import Step from './Step'

const URGENCY_LEVELS = [
  { label: 'Within 6 hours', value: 6 },
  { label: 'Within 24 hours', value: 24 },
  { label: 'Within 3 days', value: 72 },
]

export default function Urgency() {
  const searchParams = useSearchParams()
  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string

  return (
    <Step title="How urgently does this person need help?" step="Urgency">
      {URGENCY_LEVELS.map(urgency => (
        <LinkButton
          key={urgency.value}
          query={{
            action: 'neighbor',
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
