import { NextResponse } from 'next/server'

import assertEnvVarsSet from '@/helpers/assertEnvVarsSet'

assertEnvVarsSet()

interface BaseAirtableField {
  name: string
}

interface MultipleSelectsAirtableField extends BaseAirtableField {
  type: 'multipleSelects'
  options: {
    choices: { name: string }[]
  }
}

type AirtableField = MultipleSelectsAirtableField // | SomeOtherFieldType (in the future)

interface AirtableTable {
  id: string
  name: string
  fields: AirtableField[]
}

export async function GET() {
  // @see https://airtable.com/api/meta
  const tablesResponse = await fetch(
    `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    }
  )

  if (!tablesResponse.ok)
    return NextResponse.json(
      { error: 'unknown' },
      { status: tablesResponse.status }
    )

  const tables: { tables: AirtableTable[] } = await tablesResponse.json()

  if (!tables || !tables.tables)
    return NextResponse.json({ error: 'no_tables_found' }, { status: 404 })

  const table = tables.tables.find(
    (table: AirtableTable) =>
      table.id === process.env.AIRTABLE_TABLE_ID ||
      table.name === process.env.AIRTABLE_TABLE_ID
  )

  if (!table)
    return NextResponse.json({ error: 'table_not_found' }, { status: 404 })

  const resourceTypeField = table.fields.find(
    field => field.name === 'Resource Type'
  )
  if (!resourceTypeField)
    return NextResponse.json(
      { error: 'resource_type_field_not_found' },
      { status: 404 }
    )

  const countyServedField = table.fields.find(
    field => field.name === 'County Served'
  )
  if (!countyServedField)
    return NextResponse.json(
      { error: 'county_served_field_not_found' },
      { status: 404 }
    )

  return NextResponse.json({
    resourceTypeValues: resourceTypeField.options.choices.map(
      choice => choice.name
    ),
    countyServedValues: countyServedField.options.choices.map(
      choice => choice.name
    ),
  })
}
