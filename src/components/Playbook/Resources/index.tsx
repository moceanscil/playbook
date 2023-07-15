import { Checkbox, IconButton } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import Edit from './Edit'
import ResourceList from '../ResourceList'
import SendButton from './SendButton'
import Step from '../Step'

export default function Resources() {
  const [selected, setSelected] = useState<string[]>([])
  const [editResourceId, setEditResourceId] = useState<string | undefined>()
  const searchParams = useSearchParams()
  const router = useRouter()

  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string
  // const urgency = searchParams.get('urgency') as string

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
          <>
            <IconButton
              onClick={() => setEditResourceId(resourceId)}
              aria-label="Edit this resource"
            >
              <EditIcon />
            </IconButton>
            <Checkbox
              edge="end"
              checked={selected.includes(resourceId)}
              onChange={() => handleToggle(resourceId)}
            />
          </>
        )}
      />

      {!!editResourceId && (
        <Edit
          resourceId={editResourceId}
          onClose={() => setEditResourceId(undefined)}
        />
      )}

      <SendButton selectedResourceIds={selected} onClick={handleClickSend} />
    </Step>
  )
}
