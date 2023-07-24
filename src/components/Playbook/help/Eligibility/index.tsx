import { ArrowForward } from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import LinkButton from '../../LinkButton'
import Step from '../../Step'
import useResourcesWithEligibility from './useResourcesWithEligibility'

export default function Eligibility() {
  const { isLoading, resources } = useResourcesWithEligibility()

  const [selected, setSelected] = useState<string[]>([])

  const searchParams = useSearchParams()
  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  return (
    <Step
      title={
        isLoading
          ? 'Checking for eligibility requirements...'
          : 'Do any of these apply to your neighbor?'
      }
      step="Eligibility"
    >
      <List>
        {!isLoading &&
          resources.map(resource => (
            <ListItem key={resource.id}>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(resource.id)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selected.indexOf(resource.id) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      'aria-labelledby': `Eligibility__${resource.id.replaceAll(
                        ' ',
                        '-'
                      )}`,
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={`AreaOfNeed__${resource.id.replaceAll(' ', '-')}`}
                  primary={resource.Eligibility}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <LinkButton
        variant="contained"
        query={{ eligibility: selected.join(',') }}
        startIcon={<ArrowForward />}
      >
        Continue
      </LinkButton>
    </Step>
  )
}
