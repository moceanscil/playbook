import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useContext } from 'react'

import EditContext from './EditContext'

export default function EditButton({ resourceId }: { resourceId: string }) {
  const { setResourceIdToEdit: setEditResourceId } = useContext(EditContext)

  return (
    <IconButton key="edit" onClick={() => setEditResourceId(resourceId)}>
      <Edit />
    </IconButton>
  )
}
