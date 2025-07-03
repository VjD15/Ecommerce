
'use server';

import { addCategory } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});

export async function createCategoryAction(prevState: any, formData: FormData) {
  const validatedFields = CategorySchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }

  try {
    addCategory(validatedFields.data);
  } catch (error) {
    return { message: 'Failed to create category.' };
  }

  revalidatePath('/categories');
  redirect('/categories');
}
