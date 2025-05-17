import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: {userId: number}, expiresIn: string='7d') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedKey)
}
 
export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
    return null
  }
}
export async function createSession(userId: number){
    console.log("yes3")
    const jwt = await encrypt({ userId: userId })
    console.log("yes3")
    const cookieStore = await cookies()
    cookieStore.set('session', jwt, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: 'lax',
        path: '/',
    })
}

export async function verifySession(): Promise<{isAuth: boolean, userId: number} | null> {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    if (!session) {
        redirect('/login')
    }
    
    const payload = await decrypt(session.value)
    if (!payload) {
        redirect('/login')
    }
    return {isAuth: true, userId: payload.userId as number}
}