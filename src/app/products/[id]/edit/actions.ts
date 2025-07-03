
'use server';

import { updateProduct, deleteProduct } from '@/lib/data';
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

export async function updateProductAction(productId: string, prevState: any, formData: FormData) {
  const validatedFields = ProductSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed.',
    };
  }
  
  try {
    updateProduct(productId, validatedFields.data);
  } catch (error) {
    return { message: 'Failed to update product.' };
  }

  revalidatePath(`/products/${productId}`);
  revalidatePath('/products');
  redirect(`/products/${productId}`);
}

export async function deleteProductAction(productId: string) {
    try {
        deleteProduct(productId);
    } catch (error) {
        throw new Error('Failed to delete product.');
    }

    revalidatePath('/products');
    redirect('/products');
}
