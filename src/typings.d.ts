declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AIRTABLE_API_KEY: string
      AIRTABLE_BASE_ID: string
      AIRTABLE_TABLE_ID: string
    }
  }
}

export {}
