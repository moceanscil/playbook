export default class NoAirtableTablesFoundError extends Error {
  constructor(message?: string) {
    super('No Airtable tables were found.')
    Object.setPrototypeOf(this, NoAirtableTablesFoundError.prototype)
  }
}
