import {
  DialogTitle,
  DialogContent,
  SxProps,
  TextField,
  Button,
  DialogActions,
} from '@mui/material'
import SendButton from './SendButton'
import { useState } from 'react'

import getChangedFields from './helpers/getChangedFields'
import ResourceWithUpdateNotes from '@/types/ResourceWithUpdateNotes'
import getMergedSx from '@/helpers/getMergedSx'

const styles: Record<string, SxProps> = {
  dialogActions: {
    gap: 2,
  },
  field: {
    mb: 2,
  },
  firstField: {
    mt: 1,
  },
  title: {
    textAlign: 'center',
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

export default function Step2({
  resource,
  onClickPreviousStep,
  onClose,
}: {
  resource: ResourceWithUpdateNotes
  onClickPreviousStep: () => void
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
    <>
      <DialogTitle sx={styles.title}>Edit this resource</DialogTitle>
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
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Button onClick={onClickPreviousStep}>Back</Button>

        <SendButton
          resource={resource}
          updatedResource={updatedResource}
          disabled={!hasChangedFields}
          onClick={onClose}
        />
      </DialogActions>
    </>
  )
}
