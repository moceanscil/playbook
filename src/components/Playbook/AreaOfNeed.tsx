import { ArrowForward } from '@mui/icons-material'
import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { useContext, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import LinkButton from './LinkButton'
import Step from './Step'
import PlaybookContext from './PlaybookContext'

export default function AreaOfNeed() {
  const [selected, setSelected] = useState<string[]>([])
  const { resourceTypeValues } = useContext(PlaybookContext)

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
        {resourceTypeValues.map(resourceType => (
          <ListItem key={resourceType}>
            <ListItemButton
              role={undefined}
              onClick={() => handleToggle(resourceType)}
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected.indexOf(resourceType) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': `AreaOfNeed__${resourceType.replaceAll(
                      ' ',
                      '-'
                    )}`,
                  }}
                />
              </ListItemIcon>
              <ListItemText
                id={`AreaOfNeed__${resourceType.replaceAll(' ', '-')}`}
                primary={resourceType}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <LinkButton
        variant="contained"
        disabled={selected.length === 0}
        query={{
          action: 'neighbor',
          county,
          need: selected.join(','),
        }}
        startIcon={<ArrowForward />}
      >
        Continue
      </LinkButton>
    </Step>
  )
}
