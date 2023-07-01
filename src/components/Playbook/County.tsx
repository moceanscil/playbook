import LinkButton from './LinkButton'
import Step from './Step'

export default function County() {
  return (
    <Step title="In which county?" step="County">
      <LinkButton query={{ action: 'neighbor', county: 'monmouth' }}>
        Monmouth
      </LinkButton>
      <LinkButton query={{ action: 'neighbor', county: 'ocean' }}>
        Ocean
      </LinkButton>
    </Step>
  )
}
