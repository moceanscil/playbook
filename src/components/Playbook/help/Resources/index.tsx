import { Checkbox, IconButton, SxProps } from '@mui/material'
import { Edit as EditIcon } from '@mui/icons-material'
import { useRouter } from 'next/navigation'
import { useContext, useState } from 'react'

import Edit from './Edit'
import ResourceList from '../ResourceList'
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
  const [editResourceId, setEditResourceId] = useState<string | undefined>()
  const router = useRouter()
  const { getHrefWithQueryParams } = useContext(StepContext)

  const handleToggle = (valueToToggle: string) =>
    setSelected(current =>
      current.includes(valueToToggle)
        ? current.filter(value => value !== valueToToggle)
        : [...current, valueToToggle]
    )

  const handleClickSend = () => {
    router.push(getHrefWithQueryParams({ resources: selected.join(',') }))
  }

  return (
    <Step title="Here are some resources for your neighbor." step="Resources">
      <ResourceList
        renderTitleSuffix={resourceId => (
          <IconButton
            onClick={() => setEditResourceId(resourceId)}
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

      {!!editResourceId && (
        <Edit
          resourceId={editResourceId}
          onClose={() => setEditResourceId(undefined)}
        />
      )}

      <SendButton selectedResourceIds={selected} onClick={handleClickSend} />
    </Step>
  )
}
