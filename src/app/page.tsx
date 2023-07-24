import getAirtableMeta from '@/helpers/getAirtableMeta'
import Playbook from '@/components/Playbook'

const HARD_CODED_COUNTY_SERVED_VALUES = ['Monmouth', 'Ocean']

export default async function Home() {
  const airtableMeta = await getAirtableMeta()

  // We only serve Monmouth/Ocean counties, so we won't use "live" options from
  // Airtable anymore. (Leaving the code here though in case that changes in the
  // future.)
  // const countyServedValues = airtableMeta.countyServedValues
  const countyServedValues = HARD_CODED_COUNTY_SERVED_VALUES
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

export const dynamic = 'force-dynamic'
