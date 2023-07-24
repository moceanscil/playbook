import { Fragment, ReactNode, useContext } from 'react'
import { List, ListItem, ListItemText, Divider, SxProps } from '@mui/material'

import ContactInfo from './Resources/ContactInfo'
import Eligibility from './Resources/Eligibility'
import ResourceTypes from './Resources/ResourceTypes'
import ResourcesLoading from './Resources/ResourcesLoading'
import ResourcesContext from './ResourcesContext'

const styles: Record<string, SxProps> = {
  list: {
    width: '100%',
    maxWidth: 600,
  },
}

export default function ResourceList({
  renderTitleSuffix,
  renderSecondaryAction,
}: {
  renderTitleSuffix?: (resourceId: string) => ReactNode
  renderSecondaryAction?: (resourceId: string) => ReactNode
}) {
  const { isLoading, resources } = useContext(ResourcesContext)

  const isLastResource = (index: number) => index === resources.length - 1

  return (
    <List sx={styles.list}>
      {isLoading && <ResourcesLoading />}

      {!isLoading &&
        resources.map((resource, index) => (
          <Fragment key={resource.id}>
            <ListItem
              secondaryAction={
                renderSecondaryAction && renderSecondaryAction(resource.id)
              }
            >
              <ListItemText
                primary={
                  <>
                    {resource['Name of Resource']}
                    {renderTitleSuffix && renderTitleSuffix(resource.id)}
                  </>
                }
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
