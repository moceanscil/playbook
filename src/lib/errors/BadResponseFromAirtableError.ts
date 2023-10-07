export default class BadResponseFromAirtableError extends Error {
  constructor(statusCode: number) {
    super(`Airtable responded with an unexpected status code of ${statusCode}`)
    Object.setPrototypeOf(this, BadResponseFromAirtableError.prototype)
  }
}
