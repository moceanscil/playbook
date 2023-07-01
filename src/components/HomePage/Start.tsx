import LinkButton from './LinkButton'
import Step from './Step'

export default function Start() {
  return (
    <Step title="What would you like to do?" step="Start">
      <LinkButton query={{ action: 'neighbor' }}>Help a neighbor</LinkButton>
      <LinkButton query={{ action: 'update' }}>Update a resource</LinkButton>
    </Step>
  )
}
