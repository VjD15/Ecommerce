import { getCategories } from "@/lib/data";
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { getSession } from "@/lib/auth";

export default async function CategoriesPage() {
  const categories = getCategories();
  const { user } = await getSession();

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
       <div className="flex items-center justify-between">
        <div>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground">
            Product Categories
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Explore our products by browsing through the categories below.
            </p>
        </div>
        {user?.role === 'admin' && (
            <Button asChild>
                <Link href="/categories/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Category
                </Link>
            </Button>
        )}
      </div>
      
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link href={`/search?category=${category.id}`} key={category.id} className="group block">
            <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline text-xl group-hover:text-primary">{category.name}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
