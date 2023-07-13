import {
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  SxProps,
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import ContactInfo from './ContactInfo'
import Eligibility from './Eligibility'
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
  const router = useRouter()

  const county = searchParams.get('county') as string
  const need = searchParams.get('need') as string
  const urgency = searchParams.get('urgency') as string

  const { isLoading, resources } = useAirtableResources(county, need, urgency)

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  const isLastResource = (index: number) => index === resources.length - 1

  const handleClickSend = () => {
    const params = new URLSearchParams({
      county,
      need /* urgency, */,
      resources: selected.join(','),
    })
    router.push(`/?${params}`)
  }

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

      <SendButton
        selectedResourceIds={selected}
        resources={resources}
        onClick={handleClickSend}
      />
    </Step>
  )
}
