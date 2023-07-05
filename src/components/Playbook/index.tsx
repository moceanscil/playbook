'use client'

import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

import AreaOfNeed from './AreaOfNeed'
import County from './County'
import PlaybookContext from './PlaybookContext'
import Resources from './Resources'
import Start from './Start'
import Urgency from './Urgency'

const rootStyle = {
  display: 'grid',
  gridTemplateAreas: '"main"',
}

export default function Playbook() {
  const [countyServedValues, setCountyServedValues] = useState<string[]>([])
  const [resourceTypeValues, setResourceTypeValues] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/airtable/meta').then(async res => {
      const resJson = await res.json()
      setCountyServedValues(resJson.countyServedValues)
      setResourceTypeValues(resJson.resourceTypeValues)
      setIsLoading(false)
    })
  }, [])

  return (
    <PlaybookContext.Provider
      value={{ countyServedValues, resourceTypeValues }}
    >
      <div style={rootStyle}>
        {isLoading && <CircularProgress sx={{ margin: '0 auto' }} />}

        {!isLoading && (
          <>
            <Start />
            <County />
            <AreaOfNeed />
            <Urgency />
            <Resources />
          </>
        )}
      </div>
    </PlaybookContext.Provider>
  )
}
