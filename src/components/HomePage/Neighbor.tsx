import LinkButton from './LinkButton'
import Step from './Step'

export default function Neighbor() {
  return (
    <Step title="Which county?">
      <LinkButton query={{ step: 'neighbor', county: 'monmouth' }}>
        Monmouth
      </LinkButton>
      <LinkButton query={{ step: 'neighbor', county: 'ocean' }}>
        Ocean
      </LinkButton>
    </Step>
  )
}
