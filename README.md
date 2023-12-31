This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This app is deployed with Vercel.

### Environment variables

The Playbook depends on the following environment variables:
- `AIRTABLE_API_KEY`: The API key to make requests to Airtable. This API key must have both the `data.records:read` and `schema.bases:read` scopes, and of course it must have access to the Airtable base that contains the data it'll be using.
- `AIRTABLE_BASE_ID`: The ID of the Airtable base to get data from.
- `AIRTABLE_TABLE_ID`: The ID of the Airtable table to get data from. This can also be the table name; however, that's not recommended, since an Airtable user can easily change a table's name.

## Airtable database

🚨 TODO: Fill out this section with the expected structure of the Airtable database once that's known.
