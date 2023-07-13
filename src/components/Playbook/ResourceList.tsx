import Resource from '@/types/Resource'
import {
  List,
  ListItem,
  Checkbox,
  ListItemText,
  Divider,
  SxProps,
} from '@mui/material'
import { Fragment, ReactNode } from 'react'
import ContactInfo from './Resources/ContactInfo'
import Eligibility from './Resources/Eligibility'
import ResourceTypes from './Resources/ResourceTypes'
import ResourcesLoading from './Resources/ResourcesLoading'
import useAirtableResources from './Resources/useAirtableResources'
import { useSearchParams } from 'next/navigation'

const styles: Record<string, SxProps> = {
  list: {
    width: '100%',
    maxWidth: 600,
  },
}

export default function ResourceList({
  filter = () => true,
  renderSecondaryAction,
}: {
  filter?: (resource: Resource) => boolean
  renderSecondaryAction?: (resourceId: string) => ReactNode
}) {
  const searchParams = useSearchParams()

  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string
  const urgency = searchParams.get('urgency') as string

  const { isLoading, resources } = useAirtableResources(county, need, urgency)

  const filteredResources = resources.filter(filter)
  const isLastResource = (index: number) =>
    index === filteredResources.length - 1

  return (
    <List sx={styles.list}>
      {isLoading && <ResourcesLoading />}

      {!isLoading &&
        filteredResources.map((resource, index) => (
          <Fragment key={resource.id}>
            <ListItem
              secondaryAction={
                renderSecondaryAction && renderSecondaryAction(resource.id)
              }
            >
              <ListItemText
                primary={resource['Name of Resource']}
                secondary={
                  <>
                    <ResourceTypes resourceTypes={resource['Resource Type']} />
                    <Eligibility eligibility={resource.Eligibility} />
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
  )
}
