import { useEffect, useState } from 'react'

import Resource from '@/types/Resource'

export default function useAirtableResources(
  county: string,
  resourceTypes: string,
  urgency: string
) {
  const [isLoading, setIsLoading] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    if (!county || !resourceTypes || !urgency) return

    setIsLoading(true)
    const searchParams = new URLSearchParams({
      county,
      resourceTypes,
      urgency,
    })
    fetch(`/api/airtable/resources?${searchParams}`)
      .then(res => res.json())
      .then(setResources)
      .then(() => setIsLoading(false))
  }, [county, resourceTypes, urgency])

  return { isLoading, resources }
}
