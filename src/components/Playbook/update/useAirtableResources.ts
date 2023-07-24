import { useEffect, useState } from 'react'

import { FETCH_NO_CACHE } from '@/constants'
import Resource from '@/types/Resource'

export default function useAirtableResources() {
  const [isLoading, setIsLoading] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/airtable/resources/update', FETCH_NO_CACHE)
      .then(res => res.json())
      .then(setResources)
      .then(() => setIsLoading(false))
  }, [])

  return { isLoading, resources }
}
