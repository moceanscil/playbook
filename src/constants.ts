export const LOGO_COLOR_PRIMARY = 'rgb(77, 169, 197)'
export const LOGO_COLOR_SECONDARY = 'rgb(249, 200, 59)'
export const MAILTO_EMAIL_ADDRESS = 'wali.mohammed@moceanscil.org'
export const FETCH_NO_CACHE = {
  // Make sure we're getting fresh data each time while calling fetch().
  // Otherwise, this will store stale Airtable data until the next Vercel
  // deploy.
  // @see https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#static-data-fetching
  cache: 'no-store' as const,
}
