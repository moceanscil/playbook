import {
  Checkbox,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import Step from './Step'
import { useState } from 'react'
import { Send } from '@mui/icons-material'
import LinkButton from './LinkButton'

type Resource = {
  id: string
  name: string
  description: string
  url: string
}

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

const getEmailBody = (resourceIds: string[], resources: Resource[]): string =>
  resourceIds
    .map(resourceId => {
      const resource = resources.find(({ id }) => resourceId === id) as Resource
      return `- ${resource.name} (${resource.url})\n${resource.description}`
    })
    .join('\n\n')

export default function Resources() {
  const [selected, setSelected] = useState<string[]>([])

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  const emailBody = getEmailBody(selected, MOCK_RESOURCES)

  return (
    <Step title="Here are some resources for your neighbor.">
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

      <LinkButton
        disabled={!selected.length}
        href="mailto:"
        query={{ subject: 'Some helpful resources for you', body: emailBody }}
        startIcon={<Send />}
      >
        Send
      </LinkButton>
    </Step>
  )
}
