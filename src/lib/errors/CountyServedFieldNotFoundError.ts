export default class CountyServedFieldNotFoundError extends Error {
  constructor() {
    super('The "County Served" field was not found in the Airtable table.')
    Object.setPrototypeOf(this, CountyServedFieldNotFoundError.prototype)
  }
}
