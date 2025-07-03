
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { notFound, redirect, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getProductById, getCategories } from "@/lib/data";
import { updateProductAction, deleteProductAction } from './actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Trash2 } from 'lucide-react';
import type { Product, Category } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type EditProductPageProps = {
    params: { id: string }
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" aria-disabled={pending}>
            {pending ? 'Saving...' : 'Save Changes'}
        </Button>
    );
}

function DeleteButton({ productId }: { productId: string }) {
    const { pending } = useFormStatus();
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button" disabled={pending}>
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the product.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <form action={deleteProductAction.bind(null, productId)}>
                        <AlertDialogAction type="submit">Continue</AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function EditProductPage({ params }: EditProductPageProps) {
    const router = useRouter();
    const [product, setProduct] = useState<Product | undefined | null>(undefined);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setProduct(getProductById(params.id));
        setCategories(getCategories());
    }, [params.id]);

    const updateActionWithId = updateProductAction.bind(null, params.id);
    const [state, formAction] = useActionState(updateActionWithId, null);

    if (product === null) {
        notFound();
    }
    
    if (product === undefined) {
        return <div className="container mx-auto px-4 py-16">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Edit Product</CardTitle>
                    <CardDescription>
                        Update the details for &quot;{product.name}&quot;.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" defaultValue={product.name} />
                            {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={product.description} />
                            {state?.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" name="price" type="number" defaultValue={product.price} />
                                {state?.errors?.price && <p className="text-sm text-destructive">{state.errors.price[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="categoryId">Category</Label>
                                <Select name="categoryId" defaultValue={product.categoryId}>
                                    <SelectTrigger id="categoryId">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map(cat => (
                                            <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {state?.errors?.categoryId && <p className="text-sm text-destructive">{state.errors.categoryId[0]}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="images">Image URLs</Label>
                            <Textarea id="images" name="images" defaultValue={product.images.join(', ')} />
                            <p className="text-xs text-muted-foreground">Separate multiple URLs with a comma.</p>
                            {state?.errors?.images && <p className="text-sm text-destructive">{state.errors.images[0]}</p>}
                        </div>
                        {state?.message && !state.errors && (
                            <Alert variant="destructive">
                                <Terminal className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{state.message}</AlertDescription>
                            </Alert>
                        )}
                        <div className="flex justify-between items-center">
                            <DeleteButton productId={product.id} />
                            <div className="flex gap-2">
                                <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                                <SubmitButton />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
