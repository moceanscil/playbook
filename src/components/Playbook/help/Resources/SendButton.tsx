import { Fab, SxProps, TextField, Box } from '@mui/material'
import { Send } from '@mui/icons-material'
import { useContext, useState } from 'react'

import Resource from '@/types/Resource'
import ResourcesContext from '@/components/Playbook/help/ResourcesContext'

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

const getEmailBody = (
  resourceIds: string[],
  resources: Resource[]
): string =>
  resourceIds
    .map(resourceId => {
      const resource = resources.find(({ id }) => resourceId === id) as Resource
      return getResourceTextSummary(resource)
    })
    .join('\n\n')

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default function SendButton({
  selectedResourceIds,
  onClick,
}: {
  selectedResourceIds: string[]
  onClick: () => void
}) {
  const { resources } = useContext(ResourcesContext)
  const [email, setEmail] = useState('')

  if (!resources.length) return null

  const emailBody = getEmailBody(selectedResourceIds, resources)
  const emailIsValid = isValidEmail(email)

  const handleSend = async () => {
    if (!emailIsValid) return

    await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Some helpful resources for you',
        body: emailBody,
      }),
    })

    onClick()
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          zIndex: 1,
          bottom: 80,
          right: 16,
          width: 300,
        }}
      >
        <TextField
          fullWidth
          label="Enter the recipient email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={email.length > 0 && !emailIsValid}
          helperText={
            email.length > 0 && !emailIsValid
              ? 'Enter a valid email address'
              : ''
          }
          type="email"
        />
      </Box>

      <Fab
        disabled={!selectedResourceIds.length || !emailIsValid}
        variant="extended"
        sx={styles.button}
        color="primary"
        onClick={handleSend}
      >
        <Send sx={styles.icon} />
        Send
      </Fab>

      <Fab variant="extended" sx={styles.spacerButton} disabled />
    </>
  )
}
