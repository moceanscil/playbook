import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import LinkButton from './LinkButton'

const URGENCY_LEVELS = [
  { label: '6 hours', value: 6 },
  { label: '24 hours', value: 24 },
  { label: '3 days', value: 72 },
]

export default function Urgency() {
  const [selectedUrgency, setSelected] = useState<number | undefined>()

  const searchParams = useSearchParams()
  const county = searchParams.get('county') as string
  const need = searchParams.get('need')

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title="How urgently?" />
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <List>
          {URGENCY_LEVELS.map(urgency => (
            <ListItem key={urgency.value}>
              <ListItemButton
                role={undefined}
                onClick={() => setSelected(urgency.value)}
              >
                <ListItemIcon>
                  <Radio
                    edge="start"
                    checked={urgency.value === selectedUrgency}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': `Urgency__${urgency.value}`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={`Urgency__${urgency.value}`}
                  primary={urgency.label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <LinkButton
          disabled={!selectedUrgency}
          href={{
            query: {
              step: 'neighbor',
              county,
              need,
              urgency: selectedUrgency,
            },
          }}
        >
          Continue
        </LinkButton>
      </CardActions>
    </Card>
  )
}
