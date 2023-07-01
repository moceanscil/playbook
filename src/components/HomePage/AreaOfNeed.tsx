import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import LinkButton from './LinkButton'
import Step from './Step'

const AREAS_OF_NEED = [
  { label: 'Food', value: 'food' },
  { label: 'Housing', value: 'housing' },
  { label: 'Transport', value: 'transport' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Education', value: 'education' },
]

export default function AreaOfNeed() {
  const [selected, setSelected] = useState<string[]>([])

  const searchParams = useSearchParams()
  const county = searchParams.get('county') as string

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  return (
    <Step title="What area(s) do they need help with?" step="AreaOfNeed">
      <List>
        {AREAS_OF_NEED.map(area => (
          <ListItem key={area.value}>
            <ListItemButton
              role={undefined}
              onClick={() => handleToggle(area.value)}
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

      <LinkButton
        disabled={selected.length === 0}
        query={{
          action: 'neighbor',
          county,
          need: selected.join(','),
        }}
      >
        Continue
      </LinkButton>
    </Step>
  )
}
