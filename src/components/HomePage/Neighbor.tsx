import { Card, CardContent, CardHeader, SxProps } from '@mui/material'

import LinkButton from './LinkButton'

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
        <LinkButton
          sx={styles.card}
          href={{ query: { step: 'neighbor', county: 'monmouth' } }}
        >
          Monmouth
        </LinkButton>
        <LinkButton
          sx={styles.card}
          href={{ query: { step: 'neighbor', county: 'ocean' } }}
        >
          Ocean
        </LinkButton>
      </CardContent>
    </Card>
  )
}
