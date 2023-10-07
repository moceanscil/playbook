export default class ResourceTypeFieldNotFoundError extends Error {
  constructor() {
    super('The "Resource Type" field was not found in the Airtable table.')
    Object.setPrototypeOf(this, ResourceTypeFieldNotFoundError.prototype)
  }
}
