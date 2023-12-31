import LinkButton from '../LinkButton'
import Step from '../Step'

const URGENCY_LEVELS = [
  { label: 'Within 6 hours', value: 6 },
  { label: 'Within 24 hours', value: 24 },
  { label: 'Within 3 days', value: 72 },
]

export default function Urgency() {
  return (
    <Step title="How urgently do they need help?" step="Urgency">
      {URGENCY_LEVELS.map(urgency => (
        <LinkButton
          key={urgency.value}
          query={{ urgency: urgency.value.toString() }}
        >
          {urgency.label}
        </LinkButton>
      ))}
    </Step>
  )
}
