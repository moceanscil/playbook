import { Box, SxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },
  title: { textAlign: 'center' },
}

export default function Step({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <Box sx={styles.root}>
      <Typography variant="h6" sx={styles.title}>
        {title}
      </Typography>

      {children}
    </Box>
  )
}
