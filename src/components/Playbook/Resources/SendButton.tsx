import { Fab, SxProps } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useContext } from 'react'

import Resource from '@/types/Resource'
import ResourcesContext from '@/components/ResourcesContext'
import toStringWithMailFriendlySpaces from '@/helpers/toStringWithMailFriendlySpaces'

const styles: Record<string, SxProps> = {
  button: {
    position: 'fixed',
    zIndex: 1,
    bottom: 0,
    right: 0,
    mb: 2,
    mr: 2,
  },
  spacerButton: {
    opacity: 0,
    pointerEvents: 'none',
  },
  icon: {
    mr: 1,
  },
}

const getResourceTextSummary = (resource: Resource): string => {
  let summary =
    resource['Name of Resource'].toLocaleUpperCase() +
    '\n' +
    resource['Program Summary']
  if (resource['Website Link']) summary += '\n' + resource['Website Link']
  if (resource.Phone) summary += '\n' + resource.Phone
  if (resource.Address) summary += '\n' + resource.Address
  if (resource['Email Address']) summary += '\n' + resource['Email Address']

  return summary
}

const getEmailBody = (resourceIds: string[], resources: Resource[]): string =>
  resourceIds
    .map(resourceId => {
      const resource = resources.find(({ id }) => resourceId === id) as Resource
      return getResourceTextSummary(resource)
    })
    .join('\n\n')

export default function SendButton({
  selectedResourceIds,
  onClick,
}: {
  selectedResourceIds: string[]
  onClick: () => void
}) {
  const { resources } = useContext(ResourcesContext)
  if (!resources.length) return null

  const emailBody = getEmailBody(selectedResourceIds, resources)
  const params = new URLSearchParams({
    subject: 'Some helpful resources for you',
    body: emailBody,
  })

  return (
    <>
      <Fab
        disabled={!selectedResourceIds.length}
        href={`mailto:?${toStringWithMailFriendlySpaces(params)}`}
        target="_blank"
        variant="extended"
        sx={styles.button}
        color="primary"
        onClick={onClick}
      >
        <Send sx={styles.icon} />
        Send
      </Fab>

      <Fab variant="extended" sx={styles.spacerButton} disabled />
    </>
  )
}
