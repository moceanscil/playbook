import { useSearchParams } from 'next/navigation'

import ResourceList from './ResourceList'
import Step from './Step'
import { useContext } from 'react'
import StepContext from '../StepContext'

export default function Report() {
  const searchParams = useSearchParams()

  const { currentStep } = useContext(StepContext)

  if (currentStep !== 'Report') return null

  const resourceIds = (searchParams.get('resources') as string).split(',')

  return (
    <Step title="Report your INR to MOCEANS" step="Report">
      <ResourceList filter={resource => resourceIds.includes(resource.id)} />
    </Step>
  )
}
