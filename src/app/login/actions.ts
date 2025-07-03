'use server';

import { getUserByEmail } from '@/lib/users';
import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function login(prevState: any, formData: FormData) {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
      return { message: 'Email and password are required.' };
    }

    const user = getUserByEmail(email);

    if (!user || user.password !== password) {
      return { message: 'Invalid email or password.' };
    }

    await createSession(user.id);
  } catch (e) {
    if (e instanceof Error) {
        return { message: e.message };
    }
    return { message: 'An unknown error occurred.' };
  }

  redirect('/');
}
