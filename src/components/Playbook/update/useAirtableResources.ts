import { useEffect, useState } from 'react'

import Resource from '@/types/Resource'

export default function useAirtableResources() {
  const [isLoading, setIsLoading] = useState(false)
  const [resources, setResources] = useState<Resource[]>([])

  useEffect(() => {
    setIsLoading(true)
    fetch('/api/airtable/resources/update')
      .then(res => res.json())
      .then(setResources)
      .then(() => setIsLoading(false))
  }, [])

  return { isLoading, resources }
}
