import { Dialog, IconButton, SxProps } from '@mui/material'
import { useState } from 'react'

import Resource from '@/types/Resource'
import Step1 from './Step1'
import Step2 from './Step2'
import { Close } from '@mui/icons-material'

const styles: Record<string, SxProps> = {
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    mr: 1,
    mt: 1,
  },
}

export default function Edit({
  resource,
  onClose,
}: {
  resource: Resource
  onClose: () => void
}) {
  const [step, setStep] = useState(1)

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <IconButton sx={styles.closeButton} onClick={onClose}>
        <Close />
      </IconButton>

      {step === 1 && (
        <Step1
          resource={resource}
          onClose={onClose}
          onClickNextStep={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          resource={resource}
          onClose={onClose}
          onClickPreviousStep={() => setStep(1)}
        />
      )}
    </Dialog>
  )
}
