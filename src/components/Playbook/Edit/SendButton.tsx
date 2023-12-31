import { Button } from '@mui/material'
import { Send } from '@mui/icons-material'

import getChangedFields from './helpers/getChangedFields'
import { MAILTO_EMAIL_ADDRESS } from '@/constants'
import Resource from '@/types/Resource'
import ResourceWithUpdateNotes from '@/types/ResourceWithUpdateNotes'
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
  onClick,
}: {
  resource: Resource
  updatedResource: ResourceWithUpdateNotes
  disabled: boolean
  onClick: () => void
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
      href={`mailto:${MAILTO_EMAIL_ADDRESS}?${toStringWithMailFriendlySpaces(
        params
      )}`}
      target="_blank"
      rel="noreferrer"
      disabled={disabled}
      onClick={onClick}
    >
      Send edits to MOCEANS
    </Button>
  )
}
