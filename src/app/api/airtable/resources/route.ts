import Airtable, { Collaborator } from 'airtable'
import { NextResponse } from 'next/server'

if (!process.env.AIRTABLE_API_KEY) {
  throw new Error(
    'Please define AIRTABLE_API_KEY in your environment and restart/redeploy this service. See the README for more detail.'
  )
}

if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error(
    'Please define AIRTABLE_BASE_ID in your environment and restart/redeploy this service. See the README for more detail.'
  )
}

if (!process.env.AIRTABLE_TABLE_ID) {
  throw new Error(
    'Please define AIRTABLE_TABLE_ID in your environment and restart/redeploy this service. See the README for more detail.'
  )
}

// The Airtable SDK automatically uses the `AIRTABLE_API_KEY` environment
// variable when connecting to the Airtable API, but I've set it explicitly here
// anyway to make it clear where it comes from.
Airtable.configure({ apiKey: process.env.AIRTABLE_API_KEY })

const base = new Airtable().base(process.env.AIRTABLE_BASE_ID)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const county = searchParams.get('county')
  const needs = searchParams.get('need')?.split(',')
  const urgency = searchParams.get('urgency')

  if (!county)
    return NextResponse.json({ error: 'missing_county' }, { status: 400 })
  if (!needs || !needs.length)
    return NextResponse.json({ error: 'missing_need' }, { status: 400 })
  if (!urgency)
    return NextResponse.json({ error: 'missing_urgency' }, { status: 400 })

  const resourcesResult = await base<{
    'Name of Resource': string
    'Program Summary': string
  }>(process.env.AIRTABLE_TABLE_ID as string)
    // TODO: Add urgency to query once field structure has been determined.
    .select({
      fields: ['Name of Resource', 'Program Summary'],
      filterByFormula: `AND(
          OR(
            ${needs
              .map(need => `SEARCH("${need}", ARRAYJOIN({Resource Type}, ","))`)
              .join(',')}
          ),
          OR(
            SEARCH("${county}", ARRAYJOIN({County Served}, ",")),
            SEARCH("State", ARRAYJOIN({County Served}, ","))
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
