import { createContext } from 'react'

const PlaybookContext = createContext<{
  countyServedValues: string[]
  resourceTypeValues: string[]
}>({
  countyServedValues: [],
  resourceTypeValues: [],
})

export default PlaybookContext
