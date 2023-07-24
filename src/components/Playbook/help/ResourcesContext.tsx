import { createContext, ReactNode } from 'react'

import Resource from '@/types/Resource'
import { useSearchParams } from 'next/navigation'
import useAirtableResources from './useAirtableResources'

const ResourcesContext = createContext<{
  isLoading: boolean
  resources: Resource[]
}>({ isLoading: false, resources: [] })

export default ResourcesContext

export function ResourcesContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const searchParams = useSearchParams()
  const county = searchParams.get('county') as string | null
  const need = searchParams.get('need') as string | null
  const eligibility = searchParams.get('eligibility') as string | null
  const urgency = searchParams.get('urgency') as string | null
  const { isLoading, resources } = useAirtableResources(county, need, urgency)

  const selectedResourceIds = searchParams.get('resources') as string | null
  let filteredResources: Resource[]

  if (selectedResourceIds) {
    const selectedResourceIdsAsArray = selectedResourceIds.split(',')
    filteredResources = resources.filter(({ id }) =>
      selectedResourceIdsAsArray.includes(id)
    )
  } else {
    filteredResources = resources
  }

  if (eligibility !== null) {
    const eligibilityAsArray = eligibility.split(',')
    filteredResources = resources.filter(
      resource =>
        !resource.Eligibility?.trim() ||
        eligibilityAsArray.includes(resource.id)
    )
  } else {
    filteredResources = resources
  }

  return (
    <ResourcesContext.Provider
      value={{ resources: filteredResources, isLoading }}
    >
      {children}
    </ResourcesContext.Provider>
  )
}
