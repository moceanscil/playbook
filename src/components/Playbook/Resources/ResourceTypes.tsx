import { Box, Chip, SxProps } from '@mui/material'

const styles: Record<string, SxProps> = {
  root: {
    mt: 1,
    mb: 2,
  },

  chip: {
    mr: 1,
    mt: 1,
  },
}

export default function ResourceTypes({
  resourceTypes,
}: {
  resourceTypes: string[]
}) {
  return (
    <Box sx={styles.root}>
      {resourceTypes.map(label => (
        <Chip key={label} label={label} size="small" sx={styles.chip} />
      ))}
    </Box>
  )
}
