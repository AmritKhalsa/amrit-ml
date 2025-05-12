import { cookies } from "next/headers"
import { decrypt } from "./sessions"
import { redirect } from "next/navigation"
import { cache } from "react"

export const verifySession = cache(async ():Promise<{isAuth: boolean, userId: number | null} | null>=>{
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
})



