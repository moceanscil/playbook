import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
} from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import ResourcesLoading from './ResourcesLoading'
import Step from '../Step'
import SendButton from './SendButton'
import useAirtableResources from './useAirtableResources'

const styles: Record<string, SxProps> = {
  list: {
    width: '100%',
    maxWidth: 400,
  },
}

export default function Resources() {
  const [selected, setSelected] = useState<string[]>([])
  const searchParams = useSearchParams()

  const { isLoading, resources } = useAirtableResources(
    searchParams.get('county') as string,
    searchParams.get('need') as string,
    searchParams.get('urgency') as string
  )

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  return (
    <Step title="Here are some resources for your neighbor." step="Resources">
      <List sx={styles.list}>
        {isLoading && <ResourcesLoading />}

        {!isLoading &&
          resources.map(resource => (
            <ListItem
              key={resource.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  checked={selected.includes(resource.id)}
                  onChange={() => handleToggle(resource.id)}
                />
              }
            >
              <ListItemButton
                LinkComponent="a"
                href={resource['Website Link']}
                target="_blank"
                rel="noreferrer"
              >
                <ListItemText
                  primary={resource['Name of Resource']}
                  secondary={resource['Program Summary']}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>

      <SendButton selectedResourceIds={selected} resources={resources} />
    </Step>
  )
}
