import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse('<h1>Workout PJ is here</h1>', {
    headers: { 'content-type': 'text/html; charset=utf-8' },
  })
}
