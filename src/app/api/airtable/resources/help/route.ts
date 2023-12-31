import Airtable from 'airtable'
import { NextResponse } from 'next/server'

import assertEnvVarsSet from '@/helpers/assertEnvVarsSet'
import ResourceFields from '@/types/ResourceFields'

assertEnvVarsSet()

// The Airtable SDK automatically uses the `AIRTABLE_API_KEY` environment
// variable when connecting to the Airtable API, but I've set it explicitly here
// anyway to make it clear where it comes from.
Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY })

const base = new Airtable().base(process.env.AIRTABLE_BASE_ID)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const county = searchParams.get('county')
  const resourceTypes = searchParams.get('resourceTypes')?.split(',')

  if (!county)
    return NextResponse.json({ error: 'missing_county' }, { status: 400 })
  if (!resourceTypes || !resourceTypes.length)
    return NextResponse.json({ error: 'missing_need' }, { status: 400 })

  const resourcesResult = await base<ResourceFields>(
    process.env.AIRTABLE_TABLE_ID as string
  )
    // TODO: Add urgency to query once field structure has been determined.
    .select({
      fields: [
        'Name of Resource',
        'Resource Type',
        'Program Summary',
        'Website Link',
        'Phone',
        'Email Address',
        'Address',
        'Eligibility',
      ],
      filterByFormula: `AND(
          OR(
            ${resourceTypes
              .map(need => `SEARCH("${need}", ARRAYJOIN({Resource Type}, ","))`)
              .join(',')}
          ),
          OR(
            SEARCH("${county}", ARRAYJOIN({County Served}, ",")),
            SEARCH("State", ARRAYJOIN({County Served}, ",")),
            SEARCH("Federal", ARRAYJOIN({County Served}, ","))
          )
        )`,
    })
    .all()

  const resources = resourcesResult.map(resource => ({
    id: resource.id,
    ...resource.fields,
  }))

  return NextResponse.json(resources)
}

export const dynamic = 'force-dynamic'
