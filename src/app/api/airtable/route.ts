import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const res = await fetch('https://baconipsum.com/api/?type=meat-and-filler', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.DATA_API_KEY,
    },
  })
  const data = await res.json()

  return NextResponse.json(data)
}
