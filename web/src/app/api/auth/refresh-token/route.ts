import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

/**
 * POST
 * ONLY PROD
 */
export async function POST(req: Request) {
  // body
  let body
  try {
    body = await req.json()
  } catch (error) {
    return NextResponse.json(
      { data: 'SERVER_MESSAGES.BAD_REQUEST_BODY_FORMAT', code: error },
      { status: 400 },
    )
  }
  const { refreshToken } = body

  // query
  try {
    const res = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      },
    )
    const data = await res.json()
    cookies().set('token', data.id_token)
    cookies().set('refresh_token', data.refresh_token)

    return NextResponse.json({
      token: data.id_token,
      refreshToken: data.refresh_token,
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: 'SERVER_MESSAGES.ERROR_ON_EXECUTING_QUERY',
        code: 'SERVER_CODES.ERROR',
      },
      { status: 500 },
    )
  }
}
