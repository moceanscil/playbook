import { LinearProgress } from '@mui/material'
import { useContext } from 'react'

import StepContext from './StepContext'

export default function PlaybookProgress() {
  const { progress } = useContext(StepContext)

  return <LinearProgress variant="determinate" value={progress} />
}
