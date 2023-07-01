import { Box, Button, Link, SxProps } from '@mui/material'

const styles: Record<string, SxProps> = {
  card: {
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
  },
}

export default function Start() {
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
      <Button
        variant="contained"
        sx={styles.card}
        LinkComponent={Link}
        href="?step=neighbor"
      >
        I&apos;m with a neighbor
      </Button>
      <Button
        variant="contained"
        sx={styles.card}
        LinkComponent={Link}
        href="?step=update"
      >
        I want to update a resource
      </Button>
    </Box>
  )
}
