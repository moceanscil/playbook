import { Button } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useContext } from 'react'

import formatTodaysDate from './helpers/formatTodaysDate'
import Resource from '@/types/Resource'
import ResourcesContext from '@/components/ResourcesContext'

const toStringWithMailFriendlySpaces = (params: URLSearchParams) =>
  params.toString().replaceAll('+', '%20')

const getEmailBody = (resources: Resource[]): string => {
  const resourceNames = resources
    .map(resource => `- ${resource['Name of Resource']}`)
    .join('\n')

  return `INR DATE:
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
    subject: 'MOCEANS NeighborAide INR Report',
    body: emailBody,
  })

  return (
    <Button
      href={`mailto:wali.mohammed@moceanscil.org?${toStringWithMailFriendlySpaces(
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
