import { Button } from '@mui/material'
import { Send } from '@mui/icons-material'

import getChangedFields from './helpers/getChangedFields'
import Resource from '@/types/Resource'
import ResourceWithUpdateNotes from './ResourceWithUpdateNotes'
import toStringWithMailFriendlySpaces from '@/helpers/toStringWithMailFriendlySpaces'

const getChangedFieldsSummary = (
  resource: Resource,
  updatedResource: ResourceWithUpdateNotes
) => {
  const changedFields = getChangedFields(resource, updatedResource)
  let summary = resource['Name of Resource'] + '\n\n'

  let fieldName: string
  for (fieldName in changedFields) {
    if (fieldName === 'Anything else to update?') {
      summary += `- ${fieldName}: ${updatedResource[fieldName]}\n`
    } else {
      summary += `- ${fieldName}: change to "${changedFields[fieldName].new}"\n`
    }
  }

  return summary
}

export default function SendButton({
  resource,
  updatedResource,
  disabled,
}: {
  resource: Resource
  updatedResource: ResourceWithUpdateNotes
  disabled: boolean
}) {
  const body = getChangedFieldsSummary(resource, updatedResource)
  const params = new URLSearchParams({
    subject: 'Please update this resource in the NeighborAide Playbook',
    body,
  })

  return (
    <Button
      startIcon={<Send />}
      variant="contained"
      href={`mailto:wali.mohammed@moceanscil.org?${toStringWithMailFriendlySpaces(
        params
      )}`}
      disabled={disabled}
    >
      Send edits to MOCEANS
    </Button>
  )
}
