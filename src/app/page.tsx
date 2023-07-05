import getAirtableMeta from '@/helpers/getAirtableMeta'
import Playbook from '@/components/Playbook'

export default async function Home() {
  const airtableMeta = await getAirtableMeta()
  const countyServedValues = airtableMeta.countyServedValues
  const resourceTypeValues = airtableMeta.resourceTypeValues

  return (
    <Playbook
      countyServedValues={countyServedValues}
      resourceTypeValues={resourceTypeValues}
    />
  )
}

export const metadata = {
  title: 'NeighborAide Playbook',
  description: 'A playbook for social workers to access important resources.',
}
