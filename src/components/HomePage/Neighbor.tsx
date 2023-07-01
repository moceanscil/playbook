import LinkButton from './LinkButton'
import Step from './Step'

export default function Neighbor() {
  return (
    <Step title="Which county?">
      <LinkButton query={{ action: 'neighbor', county: 'monmouth' }}>
        Monmouth
      </LinkButton>
      <LinkButton query={{ action: 'neighbor', county: 'ocean' }}>
        Ocean
      </LinkButton>
    </Step>
  )
}
