import { SxProps, Typography } from '@mui/material'
import { ReactNode } from 'react'

const styles: Record<string, SxProps> = {
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
    <>
      <Typography variant="h6" sx={styles.title}>
        {title}
      </Typography>

      {children}
    </>
  )
}
