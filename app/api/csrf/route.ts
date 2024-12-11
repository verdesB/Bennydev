import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

export async function GET() {
  const token = uuidv4()
  
  // Stockez temporairement le token (15 minutes)
  const expiresIn = new Date(Date.now() + 15 * 60 * 1000)
  
  return NextResponse.json(
    { token },
    {
      headers: {
        'Set-Cookie': `csrf=${token}; HttpOnly; Path=/; Expires=${expiresIn.toUTCString()}`
      }
    }
  )
} 