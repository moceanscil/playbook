'use client'

import { Box, Card, SxProps } from '@mui/material'

const styles: Record<string, SxProps> = {
  card: {
    flexGrow: 1,
    flexShrink: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,

    backgroundColor: 'primary.light',
    color: 'primary.contrastText',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}

export default function HomePage() {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        justifyContent: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'stretch',
        flexGrow: 1,
        py: 2,
      }}
    >
      <Card sx={styles.card}>I'm with a neighbor</Card>
      <Card sx={styles.card}>I want to update a resource</Card>
    </Box>
  )
}
