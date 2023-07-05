export default function assertEnvVarsSet() {
  if (!process.env.AIRTABLE_API_KEY) {
    throw new Error(
      'Please define AIRTABLE_API_KEY in your environment and restart/redeploy this service. See the README for more detail.'
    )
  }

  if (!process.env.AIRTABLE_BASE_ID) {
    throw new Error(
      'Please define AIRTABLE_BASE_ID in your environment and restart/redeploy this service. See the README for more detail.'
    )
  }

  if (!process.env.AIRTABLE_TABLE_ID) {
    throw new Error(
      'Please define AIRTABLE_TABLE_ID in your environment and restart/redeploy this service. See the README for more detail.'
    )
  }
}
