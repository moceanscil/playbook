export default class UnauthorizedError extends Error {
  constructor() {
    super(
      'Unauthorized - we could not establish an authorized connection to Airtable.'
    )
    Object.setPrototypeOf(this, UnauthorizedError.prototype)
  }
}
