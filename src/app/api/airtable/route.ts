import Airtable from 'airtable'
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
  const result = await base(process.env.AIRTABLE_TABLE_ID as string)
    .select({
      fields: ['Notes', 'Multi Select', 'Assignee', 'Tags'],
    })
    .all()

  return NextResponse.json(result.map(item => item._rawJson))
}
