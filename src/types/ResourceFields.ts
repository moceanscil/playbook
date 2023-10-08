type ResourceFields = {
  'Name of Resource': string
  'Resource Type': string[]
  'Program Summary': string
  'Website Link': string
  Phone?: string
  'Email Address'?: string
  Address?: string
  Eligibility?: string
  /**
   * This field is saved in AirTable with a space at the end of the name, so we
   * have to enter it with a space at the end here as well to match.
   */
  'Last Modified ': string
}

export default ResourceFields
