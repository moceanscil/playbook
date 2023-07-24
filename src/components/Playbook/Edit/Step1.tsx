import { Box, Button, DialogContent, DialogTitle, SxProps } from '@mui/material'

import { MAILTO_EMAIL_ADDRESS } from '@/constants'
import Resource from '@/types/Resource'
import toStringWithMailFriendlySpaces from '@/helpers/toStringWithMailFriendlySpaces'

const styles: Record<string, SxProps> = {
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,

    overflow: 'hidden',
    gridArea: 'main',

    transition: '0.5s',
  },
  title: {
    textAlign: 'center',
  },
}

export default function Step1({
  resource,
  onClickNextStep,
  onClose,
}: {
  resource: Resource
  onClickNextStep: () => void
  onClose: () => void
}) {
  const params = new URLSearchParams({
    subject: 'Reporting a resource as up-to-date',
    body: `I'm writing to report that I contacted ${resource['Name of Resource']} via <phone/email/etc.> and their contact information is current.`,
  })
  const mailtoHref = `mailto:${MAILTO_EMAIL_ADDRESS}?${toStringWithMailFriendlySpaces(
    params
  )}`

  return (
    <>
      <DialogTitle sx={styles.title}>What would you like to do?</DialogTitle>
      <DialogContent>
        <Box sx={styles.buttonsWrapper}>
          <Button
            href={mailtoHref}
            target="_blank"
            rel="noreferrer"
            onClick={onClose}
          >
            Mark this resource as up-to-date
          </Button>
          <Button onClick={onClickNextStep}>Edit this resource</Button>
        </Box>
      </DialogContent>
    </>
  )
}
