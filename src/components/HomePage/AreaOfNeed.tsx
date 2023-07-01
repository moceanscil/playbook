import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from '@mui/material'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const styles: Record<string, SxProps> = {
  card: {
    flexBasis: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 300,
  },
}

const AREAS_OF_NEED = [
  { label: 'Food', value: 'food' },
  { label: 'Housing', value: 'housing' },
  { label: 'Transport', value: 'transport' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
]

export default function AreaOfNeed() {
  const [selected, setSelected] = useState<string[]>([])

  const { step } = useParams()
  const [, county] = step.split('/')

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title="What area of need?" />
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <List>
          {AREAS_OF_NEED.map(area => (
            <ListItem key={area.value}>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(area.value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selected.indexOf(area.value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': `AreaOfNeed__${area.value}`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={`AreaOfNeed__${area.value}`}
                  primary={area.label}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          disabled={selected.length === 0}
          variant="contained"
          LinkComponent={Link}
          href={`/neighbor/${county}/${selected.join(',')}`}
        >
          Continue
        </Button>
      </CardActions>
    </Card>
  )
}
