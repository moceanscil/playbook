import { Box, SxProps, Typography } from '@mui/material'
import { ReactNode, useContext } from 'react'
import { Transition } from 'react-transition-group'

import StepContext from '../StepContext'

const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,

    gridArea: 'main',

    transition: '0.5s',
  },
  title: { textAlign: 'center' },
}

export default function Step({
  title,
  children,
  step,
}: {
  title: string
  children: ReactNode
  step: string
}) {
  const { currentStep } = useContext(StepContext)

  return (
    <Transition
      key="Step"
      component={null}
      timeout={250}
      appear
      in={step === currentStep}
    >
      {state => (
        <Box
          sx={styles.root}
          style={{
            display: state === 'exited' ? 'none' : 'flex',
            opacity: state === 'entered' ? 1 : 0,
            transform:
              state === 'entered'
                ? 'none'
                : state === 'entering'
                ? 'translateY(10px)'
                : 'translateY(-10px)',
          }}
        >
          <Typography variant="h6" sx={styles.title}>
            {title}
          </Typography>

          {children}
        </Box>
      )}
    </Transition>
  )
}
