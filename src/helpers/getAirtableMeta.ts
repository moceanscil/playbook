import assertEnvVarsSet from '@/helpers/assertEnvVarsSet'
import { FETCH_NO_CACHE } from '@/constants'

import AirtableResourcesTableNotFoundError from '@/lib/errors/AirtableResourcesTableNotFoundError'
import BadResponseFromAirtableError from '@/lib/errors/BadResponseFromAirtableError'
import CountyServedFieldNotFoundError from '@/lib/errors/CountyServedFieldNotFoundError'
import NoAirtableTablesFoundError from '@/lib/errors/NoAirtableTablesFoundError'
import ResourceTypeFieldNotFoundError from '@/lib/errors/ResourceTypeFieldNotFoundError'
import UnauthorizedError from '@/lib/errors/UnauthorizedError'

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
      ...FETCH_NO_CACHE,
    }
  )

  if (!tablesResponse.ok && tablesResponse.status === 401)
    throw new UnauthorizedError()
  if (!tablesResponse.ok)
    throw new BadResponseFromAirtableError(tablesResponse.status)

  const tables: { tables: AirtableTable[] } = await tablesResponse.json()

  if (!tables || !tables.tables) throw new NoAirtableTablesFoundError()

  const table = tables.tables.find(
    (table: AirtableTable) =>
      table.id === process.env.AIRTABLE_TABLE_ID ||
      table.name === process.env.AIRTABLE_TABLE_ID
  )

  if (!table) throw new AirtableResourcesTableNotFoundError()

  const resourceTypeField = table.fields.find(
    field => field.name === 'Resource Type'
  )
  if (!resourceTypeField) throw new ResourceTypeFieldNotFoundError()

  const countyServedField = table.fields.find(
    field => field.name === 'County Served'
  )
  if (!countyServedField) throw new CountyServedFieldNotFoundError()

  return {
    resourceTypeValues: resourceTypeField.options.choices
      .map(choice => choice.name)
      .sort(),
    countyServedValues: countyServedField.options.choices
      .map(choice => choice.name)
      .sort(),
  }
}
