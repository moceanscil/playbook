import { Checkbox, IconButton, SxProps } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import Edit from '../../Edit'
import NoResources from './NoResources'
import Resource from '@/types/Resource'
import ResourceList from '../ResourceList'
import ResourcesContext from '../ResourcesContext'
import SendButton from './SendButton'
import Step from '../../Step'
import StepContext from '@/components/StepContext'

const styles: Record<string, SxProps> = {
  editButton: {
    ml: 1,
  },
}

export default function Resources() {
  const [selected, setSelected] = useState<string[]>([])
  const { resources } = useContext(ResourcesContext)
  const [resourceIdToEdit, setResourceIdToEdit] = useState<string | undefined>()
  const router = useRouter()
  const { getHrefWithQueryParams } = useContext(StepContext)

  const resourceToEdit: Resource | undefined = resourceIdToEdit
    ? resources.find(resource => resource.id === resourceIdToEdit)
    : undefined

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  const handleClickSend = () => {
    router.push(getHrefWithQueryParams({ resources: selected.join(',') }))
  }

  const title = resources.length
    ? 'Here are some resources for your neighbor.'
    : "We're sorry!"

  return (
    <Step title={title} step="Resources">
      {!!resources.length && (
        <>
          <ResourceList
            renderTitleSuffix={resourceId => (
              <IconButton
                onClick={() => setResourceIdToEdit(resourceId)}
                aria-label="Edit this resource"
                size="small"
                sx={styles.editButton}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
            renderSecondaryAction={resourceId => (
              <Checkbox
                edge="end"
                checked={selected.includes(resourceId)}
                onChange={() => handleToggle(resourceId)}
              />
            )}
          />

          {!!resourceToEdit && (
            <Edit
              resource={resourceToEdit}
              onClose={() => setResourceIdToEdit(undefined)}
            />
          )}

          <SendButton
            selectedResourceIds={selected}
            onClick={handleClickSend}
          />
        </>
      )}

      {!resources.length && <NoResources />}
    </Step>
  )
}
