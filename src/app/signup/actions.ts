'use server';

import { getUserByEmail, addUser } from '@/lib/users';
import { createSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function signup(prevState: any, formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!name || !email || !password) {
      return { message: 'All fields are required.' };
    }

    if (getUserByEmail(email)) {
      return { message: 'User with this email already exists.' };
    }

    const newUser = addUser({ name, email, password });
    await createSession(newUser.id);
  } catch (e) {
    if (e instanceof Error) {
      return { message: e.message };
    }
    return { message: 'An unknown error occurred.' };
  }

  redirect('/');
}
