import { useContext } from 'react'

import LinkButton from '../LinkButton'
import PlaybookContext from './PlaybookContext'
import Step from '../Step'

export default function County() {
  const { countyServedValues } = useContext(PlaybookContext)

  return (
    <Step title="Which county are you helping a neighbor in?" step="County">
      {countyServedValues.map(county => (
        <LinkButton query={{ county }} key={county}>
          {county}
        </LinkButton>
      ))}
    </Step>
  )
}
