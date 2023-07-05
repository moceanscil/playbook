import { useContext } from 'react'

import LinkButton from './LinkButton'
import PlaybookContext from './PlaybookContext'
import Step from './Step'

export default function County() {
  // TODO: Limit to just Monmouth/Ocean?
  const { countyServedValues } = useContext(PlaybookContext)

  return (
    <Step title="In which county?" step="County">
      {countyServedValues.map(county => (
        <LinkButton query={{ action: 'neighbor', county }} key={county}>
          {county}
        </LinkButton>
      ))}
    </Step>
  )
}
