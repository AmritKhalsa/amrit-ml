'use server'
import 'server-only'
import db from '@/connection/drizzle'
import { UsersTable } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import bcrypt from 'bcryptjs';
import { createSession, encrypt, verifySession } from './sessions'
import { cookies } from 'next/headers'
import { verify } from 'crypto'


type SignupFormState =
{
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
}
const SignupFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export async function signup(prevstate: SignupFormState | undefined, formData: FormData): Promise<SignupFormState | undefined> {
    const validatedFields = SignupFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    if (!validatedFields.success) {
        return {};
    }
    const { email, password } = validatedFields.data
    const Email = await db.select().from(UsersTable).where(eq(UsersTable.email, email)).execute()
    if (Email.length > 0) {
        return { errors: { email: ['Email already exists'] } };
    }
    const hashedPassword = bcrypt.hashSync(password, 12)
    try {
        await db.insert(UsersTable).values({
            name: email,
            email: email,
            password: hashedPassword
        })
    } catch (error: any) {
        console.error("Error while signing up", error.message);
        return { errors: { email: ['Failed to create user.'], password: ['Failed to create user'] }, message: 'Database error' };
    }

}



type LoginFormState = {
    cred: {
        email: string
        password: string
    }
    errors?: {
        email?: string[]
        password?: string[]
    }
    message?: string
}
const loginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .string()
        .min(8, { message: 'Be at least 8 characters long. ' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter. ' })
        .regex(/[0-9]/, { message: 'Contain at least one number. ' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character. ',
        })
        .trim(),
})

export async function login(state: LoginFormState | undefined, formData: FormData): Promise<LoginFormState> {
    const validatedFields = loginFormSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })
    if (!validatedFields.success) {
        console.log(validatedFields.error.flatten().fieldErrors)
        return { errors: validatedFields.error.flatten().fieldErrors, cred: { email: formData.get('email') as string, password: formData.get('password') as string } }
    }
    
    const { email, password } = validatedFields.data
    const user = await db.select().from(UsersTable).where(eq(UsersTable.email, email)).execute()
    if (user.length === 0) {
        return { errors: { email: ['Email not found'] }, cred: { email: email, password: password }  }
    }
    if (bcrypt.compareSync(password, user[0].password)) {
        await createSession(user[0].id)
        const session = await verifySession();
        if (session === null) {
            return { message:  'Failed to create user session' , cred: { email: email, password: password } }
        }
        
        return { message: 'Login successful', cred: { email: '', password: '' } };
    } else {
        return { errors: { password: ['Incorrect Password'] }, cred: { email: email, password: password } };
    }
    
    
}