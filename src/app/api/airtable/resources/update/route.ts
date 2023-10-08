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

export async function GET() {
  const resourcesResult = await base<ResourceFields>(
    process.env.AIRTABLE_TABLE_ID as string
  )
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
        'Last Modified ',
      ],
    })
    .all()

  const resources = resourcesResult.map(resource => ({
    id: resource.id,
    ...resource.fields,
  }))

  return NextResponse.json(resources)
}

export const dynamic = 'force-dynamic'
