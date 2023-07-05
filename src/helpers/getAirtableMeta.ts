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

export default async function getAirtableMeta() {
  // @see https://airtable.com/api/meta
  const tablesResponse = await fetch(
    `https://api.airtable.com/v0/meta/bases/${process.env.AIRTABLE_BASE_ID}/tables`,
    {
      headers: { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` },
    }
  )

  if (!tablesResponse.ok) throw new Error('unknown')

  const tables: { tables: AirtableTable[] } = await tablesResponse.json()

  if (!tables || !tables.tables) throw new Error('no_tables_found')

  const table = tables.tables.find(
    (table: AirtableTable) =>
      table.id === process.env.AIRTABLE_TABLE_ID ||
      table.name === process.env.AIRTABLE_TABLE_ID
  )

  if (!table) throw new Error('table_not_found')

  const resourceTypeField = table.fields.find(
    field => field.name === 'Resource Type'
  )
  if (!resourceTypeField) throw new Error('resource_type_field_not_found')

  const countyServedField = table.fields.find(
    field => field.name === 'County Served'
  )
  if (!countyServedField) throw new Error('county_served_field_not_found')

  return {
    resourceTypeValues: resourceTypeField.options.choices.map(
      choice => choice.name
    ),
    countyServedValues: countyServedField.options.choices.map(
      choice => choice.name
    ),
  }
}
