import { Checkbox } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import ResourceList from '../ResourceList'
import SendButton from './SendButton'
import Step from '../Step'
import useAirtableResources from './useAirtableResources'

export default function Resources() {
  const [selected, setSelected] = useState<string[]>([])
  const searchParams = useSearchParams()
  const router = useRouter()

  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string
  const urgency = searchParams.get('urgency') as string

  const { isLoading, resources } = useAirtableResources(county, need, urgency)

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  const handleClickSend = () => {
    const params = new URLSearchParams({
      county,
      need /* urgency, */,
      resources: selected.join(','),
    })
    router.push(`/?${params}`)
  }

  return (
    <Step title="Here are some resources for your neighbor." step="Resources">
      <ResourceList
        renderSecondaryAction={resourceId => (
          <Checkbox
            edge="end"
            checked={selected.includes(resourceId)}
            onChange={() => handleToggle(resourceId)}
          />
        )}
      />

      <SendButton
        selectedResourceIds={selected}
        resources={resources}
        onClick={handleClickSend}
      />
    </Step>
  )
}
