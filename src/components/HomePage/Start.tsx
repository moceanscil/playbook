import LinkButton from './LinkButton'
import Step from './Step'

export default function Start() {
  return (
    <Step title="What would you like to do?">
      <LinkButton query={{ step: 'neighbor' }}>Help a neighbor</LinkButton>
      <LinkButton query={{ step: 'update' }}>Update a resource</LinkButton>
    </Step>
  )
}
