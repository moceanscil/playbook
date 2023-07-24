import { useEffect, useState } from 'react'

import Resource from '@/types/Resource'

export default function useAirtableResources(
  county: string | null,
  resourceTypes: string | null,
  urgency: string | null
) {
  const [isLoading, setIsLoading] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    if (!county || !resourceTypes /*|| !urgency*/) {
      // Reset the list so it doesn't mistakenly cache a list from a previous
      // API call.
      setResources([])
      return
    }

    setIsLoading(true)
    const searchParams = new URLSearchParams({
      county,
      resourceTypes,
      // urgency,
    })
    fetch(`/api/airtable/resources?${searchParams}`)
      .then(res => res.json())
      .then(setResources)
      .then(() => setIsLoading(false))
  }, [county, resourceTypes, urgency])

  return { isLoading, resources }
}
