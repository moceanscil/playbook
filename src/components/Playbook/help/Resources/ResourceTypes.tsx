import { Box, SxProps, Typography } from '@mui/material'

const styles: Record<string, SxProps> = {
  root: {
    mb: 2,
  },
}

export default function ResourceTypes({
  resourceTypes,
}: {
  resourceTypes: string[]
}) {
  if (!resourceTypes.length) return null
  return (
    <Box sx={styles.root}>
      <Typography variant="caption">{resourceTypes.join(', ')}</Typography>
    </Box>
  )
}
