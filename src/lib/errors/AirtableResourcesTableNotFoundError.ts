export default class AirtableResourcesTableNotFoundError extends Error {
  constructor() {
    super('We could not find the Resources table in Airtable.')
    Object.setPrototypeOf(this, AirtableResourcesTableNotFoundError.prototype)
  }
}
