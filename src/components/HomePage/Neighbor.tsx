import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  SxProps,
} from '@mui/material'

const styles: Record<string, SxProps> = {
  card: {
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
  },
}

export default function Neighbor() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Which county?" />
      <CardContent
        sx={{
          height: '100%',
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
          href="/neighbor/monmouth"
        >
          Monmouth
        </Button>
        <Button
          variant="contained"
          sx={styles.card}
          LinkComponent={Link}
          href="/neighbor/ocean"
        >
          Ocean
        </Button>
      </CardContent>
    </Card>
  )
}
