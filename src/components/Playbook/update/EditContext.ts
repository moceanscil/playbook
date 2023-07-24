import { createContext } from 'react'

const EditContext = createContext<{
  resourceIdToEdit?: string
  setResourceIdToEdit: (resourceId: string) => void
}>({ setResourceIdToEdit: () => {} })

export default EditContext
