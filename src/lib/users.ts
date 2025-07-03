import type { User } from './types';

// In a real app, this would be a database. For this prototype, we're using
// an in-memory array which is reset on every server restart.
const users: Omit<User, 'role'>[] = [
  {
    id: 'user-admin',
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: 'adminpassword',
  },
  {
    id: 'user-1',
    name: 'Test User',
    email: 'user@example.com',
    password: 'userpassword',
  },
];

// NOTE: This is not a persistent store. Users will be lost on server restart.
export function addUser(user: Pick<User, 'name' | 'email' | 'password'>) {
  const newUser = {
    ...user,
    id: `user-${Date.now()}`
  };
  users.push(newUser);
  return newUser;
}

export function getUserByEmail(email: string) {
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

export function getUserById(id: string) {
  return users.find(u => u.id === id);
}
