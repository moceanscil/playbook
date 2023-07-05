import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  SxProps,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useSearchParams } from 'next/navigation'

import ContactInfo from './ContactInfo'
import ResourcesLoading from './ResourcesLoading'
import ResourceTypes from './ResourceTypes'
import SendButton from './SendButton'
import Step from '../Step'
import useAirtableResources from './useAirtableResources'

const styles: Record<string, SxProps> = {
  list: {
    width: '100%',
    maxWidth: 600,
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

  const isLastResource = (index: number) => index === resources.length - 1

  return (
    <Step title="Here are some resources for your neighbor." step="Resources">
      <List sx={styles.list}>
        {isLoading && <ResourcesLoading />}

        {!isLoading &&
          resources.map((resource, index) => (
            <Fragment key={resource.id}>
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
                <ListItemText
                  primary={resource['Name of Resource']}
                  secondary={
                    <>
                      <ResourceTypes
                        resourceTypes={resource['Resource Type']}
                      />
                      {resource['Program Summary']}
                      <ContactInfo resource={resource} />
                    </>
                  }
                  secondaryTypographyProps={{ component: 'div' }}
                />
              </ListItem>

              {!isLastResource(index) && <Divider component="li" />}
            </Fragment>
          ))}
      </List>

      <SendButton selectedResourceIds={selected} resources={resources} />
    </Step>
  )
}
