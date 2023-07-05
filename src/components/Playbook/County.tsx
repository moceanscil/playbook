import LinkButton from './LinkButton'
import Step from './Step'

export default function County() {
  return (
    <Step title="In which county?" step="County">
      <LinkButton query={{ action: 'neighbor', county: 'Monmouth' }}>
        Monmouth
      </LinkButton>
      <LinkButton query={{ action: 'neighbor', county: 'Ocean' }}>
        Ocean
      </LinkButton>
    </Step>
  )
}
