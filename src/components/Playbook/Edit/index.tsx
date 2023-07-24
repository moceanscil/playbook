import {
  Dialog,
  DialogContent,
  DialogTitle,
  SxProps,
  TextField,
} from '@mui/material'
import { useState } from 'react'

import getChangedFields from './helpers/getChangedFields'
import getMergedSx from '@/helpers/getMergedSx'
import Resource from '@/types/Resource'
import ResourceWithUpdateNotes from '@/types/ResourceWithUpdateNotes'
import SendButton from './SendButton'

const styles: Record<string, SxProps> = {
  field: {
    mb: 2,
  },
  firstField: {
    mt: 1,
  },
}

const EditableField = ({
  field,
  resource,
  sx,
  multiline,
  handleUpdateField,
}: {
  field: keyof ResourceWithUpdateNotes
  resource: ResourceWithUpdateNotes
  sx?: SxProps
  multiline?: boolean
  handleUpdateField: (fieldName: string, newValue: string) => void
}) => {
  return (
    <TextField
      label={field}
      fullWidth
      value={resource[field]}
      onChange={e => handleUpdateField(field, e.target.value)}
      sx={getMergedSx(styles.field, sx)}
      multiline={multiline}
    />
  )
}

export default function Edit({
  resource,
  onClose,
}: {
  resource: Resource
  onClose: () => void
}) {
  const [updatedResource, setUpdatedResource] =
    useState<ResourceWithUpdateNotes>(resource)
  const changedFields = getChangedFields(resource, updatedResource)
  const hasChangedFields = !!Object.keys(changedFields).length

  const handleUpdateField = (fieldName: string, newValue: string) => {
    setUpdatedResource(values => ({
      ...values,
      [fieldName]: newValue,
    }))
  }

  return (
    <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit this resource</DialogTitle>
      <DialogContent>
        <EditableField
          field="Name of Resource"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
          sx={styles.firstField}
        />

        <EditableField
          field="Website Link"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
        />

        <EditableField
          field="Phone"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
        />

        <EditableField
          field="Email Address"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
        />

        <EditableField
          field="Address"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
        />

        <EditableField
          field="Program Summary"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
          multiline
        />

        <EditableField
          field="Anything else to update?"
          resource={updatedResource}
          handleUpdateField={handleUpdateField}
          multiline
        />

        <SendButton
          resource={resource}
          updatedResource={updatedResource}
          disabled={!hasChangedFields}
        />
      </DialogContent>
    </Dialog>
  )
}