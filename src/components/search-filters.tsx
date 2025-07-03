"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { getCategories } from "@/lib/data";
import { useState } from "react";

interface SearchFiltersProps {
  onFilterChange: (filters: {
    categories: string[];
    priceRange: [number, number];
    availability: boolean;
  }) => void;
  initialPriceRange: [number, number];
  initialCategories: string[];
}

export function SearchFilters({
  onFilterChange,
  initialPriceRange,
  initialCategories,
}: SearchFiltersProps) {
  const allCategories = getCategories();
  const [currentCategories, setCurrentCategories] = useState(initialCategories);
  const [currentPriceRange, setCurrentPriceRange] = useState(initialPriceRange);
  const [currentAvailability, setCurrentAvailability] = useState(false);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter((c) => c !== categoryId);
    setCurrentCategories(newCategories);
    onFilterChange({
      categories: newCategories,
      priceRange: currentPriceRange,
      availability: currentAvailability,
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newPriceRange = [value[0], value[1]] as [number, number];
    setCurrentPriceRange(newPriceRange);
    onFilterChange({
      categories: currentCategories,
      priceRange: newPriceRange,
      availability: currentAvailability,
    });
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setCurrentAvailability(checked);
    onFilterChange({
      categories: currentCategories,
      priceRange: currentPriceRange,
      availability: checked,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-4 font-semibold">Category</h3>
          <div className="space-y-2">
            {allCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={currentCategories.includes(category.id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, !!checked)
                  }
                />
                <Label htmlFor={`cat-${category.id}`} className="font-normal">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Price Range</h3>
          <Slider
            value={currentPriceRange}
            max={160000}
            step={5000}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceChange}
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₹{currentPriceRange[0]}</span>
            <span>₹{currentPriceRange[1]}</span>
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold">Availability</h3>
          <div className="flex items-center space-x-2">
            <Switch
              id="availability"
              onCheckedChange={handleAvailabilityChange}
              checked={currentAvailability}
            />
            <Label htmlFor="availability">In Stock Only</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
