import { Box, SxProps, Typography } from '@mui/material'

const styles: Record<string, SxProps> = {
  root: {
    mb: 2,
    mt: -2,
  },
}

export default function Eligibility({ eligibility }: { eligibility?: string }) {
  if (!eligibility) return null

  return (
    <Box sx={styles.root}>
      <Typography variant="caption">Eligibility: {eligibility}</Typography>
    </Box>
  )
}
