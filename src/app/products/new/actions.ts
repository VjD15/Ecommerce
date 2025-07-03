
'use server';

import { addProduct } from '@/lib/data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(1, 'Price must be greater than 0'),
  categoryId: z.string().min(1, 'Category is required'),
  images: z.string().min(1, 'At least one image URL is required'),
});

export async function createProductAction(prevState: any, formData: FormData) {
  const validatedFields = ProductSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }
  
  try {
    addProduct(validatedFields.data);
  } catch (error) {
    return { message: 'Failed to create product.' };
  }

  revalidatePath('/products');
  redirect('/products');
}
