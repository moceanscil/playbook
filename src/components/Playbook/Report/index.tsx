import { Box } from '@mui/system'
import { SxProps, Typography } from '@mui/material'
import { useContext } from 'react'

import formatTodaysDate from './helpers/formatTodaysDate'
import ResourceList from '../ResourceList'
import SendButton from './SendButton'
import Step from '../Step'
import StepContext from '../../StepContext'

const styles: Record<string, SxProps> = {
  date: {
    mb: 4,
  },
  root: {
    width: '100%',
    maxWidth: 600,
  },
  sendButtonWrapper: {
    textAlign: 'center',
    mb: 4,
  },
}

export default function Report() {
  const { currentStep } = useContext(StepContext)

  if (currentStep !== 'Report') return null

  return (
    <Step title="Report your INR to MOCEANS" step="Report">
      <Box sx={styles.root}>
        <Box sx={styles.sendButtonWrapper}>
          <SendButton />
        </Box>

        <Typography variant="h2">Report date:</Typography>
        <Typography sx={styles.date}>{formatTodaysDate()}</Typography>

        <Typography variant="h2">You sent the following resources:</Typography>
        <ResourceList />
      </Box>
    </Step>
  )
}
