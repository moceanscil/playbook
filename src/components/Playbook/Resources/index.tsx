import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'
import { useState } from 'react'

import Resource from '@/types/Resource'
import Step from '../Step'
import SendButton from './SendButton'

const MOCK_RESOURCES: Resource[] = [
  {
    id: '1',
    name: 'Test resource 1',
    description: 'This is a description',
    url: 'https://google.com',
  },
  {
    id: '2',
    name: 'Test resource 2',
    description: 'This is a description as well',
    url: 'https://google.com',
  },
]

export default function Resources() {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  return (
    <Step title="Here are some resources for your neighbor." step="Resources">
      <List>
        {MOCK_RESOURCES.map(resource => (
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
              href={resource.url}
              target="_blank"
              rel="noreferrer"
            >
              <ListItemText
                primary={resource.name}
                secondary={resource.description}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <SendButton selectedResourceIds={selected} resources={MOCK_RESOURCES} />
    </Step>
  )
}
