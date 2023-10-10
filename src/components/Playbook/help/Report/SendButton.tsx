import { Button } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useContext } from 'react'

import formatTodaysDate from './helpers/formatTodaysDate'
import { MAILTO_EMAIL_ADDRESS } from '@/constants'
import Resource from '@/types/Resource'
import ResourcesContext from '@/components/Playbook/help/ResourcesContext'
import toStringWithMailFriendlySpaces from '@/helpers/toStringWithMailFriendlySpaces'

const getEmailBody = (resources: Resource[]): string => {
  const resourceNames = resources
    .map(resource => `- ${resource['Name of Resource']}`)
    .join('\n')

  return `I&R DATE:
${formatTodaysDate()}

ARE YOU REFERRING YOUR NEIGHBOR TO MOCEANS?
<yes/no>

RESOURCES SENT:
${resourceNames}

NOTES:

`
}

export default function SendButton() {
  const { resources } = useContext(ResourcesContext)
  const emailBody = getEmailBody(resources)
  const params = new URLSearchParams({
    subject: 'MOCEANS NeighborAide I&R Report',
    body: emailBody,
  })

  return (
    <Button
      href={`mailto:${MAILTO_EMAIL_ADDRESS}?${toStringWithMailFriendlySpaces(
        params
      )}`}
      target="_blank"
      variant="contained"
      startIcon={<Send />}
    >
      Send to MOCEANS
    </Button>
  )
}
