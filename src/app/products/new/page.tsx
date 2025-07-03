
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { getCategories } from '@/lib/data';
import { createProductAction } from './actions';
import { useEffect, useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" aria-disabled={pending}>
            {pending ? 'Creating...' : 'Create Product'}
        </Button>
    );
}

export default function NewProductPage() {
  const [state, formAction] = useActionState(createProductAction, null);
  const [categories, setCategories] = useState<Awaited<ReturnType<typeof getCategories>>>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Create New Product</CardTitle>
          <CardDescription>
            Fill out the form below to add a new product to the catalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" placeholder="e.g., Quantum Laptop" />
              {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the product..." />
              {state?.errors?.description && <p className="text-sm text-destructive">{state.errors.description[0]}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" placeholder="108000" />
                    {state?.errors?.price && <p className="text-sm text-destructive">{state.errors.price[0]}</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="categoryId">Category</Label>
                    <Select name="categoryId">
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
                <Textarea id="images" name="images" placeholder="https://.../image1.png, https://.../image2.png" />
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
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
