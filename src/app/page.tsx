"use client";

import React, { useState, useMemo } from 'react';
import ServiceCard from '@/components/service-card';
import { services, categories } from '@/lib/data';
import type { Service } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';

export default function Home() {
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const [category, setCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number]>([500]);
  const [rating, setRating] = useState<string>('all');
  
  const maxPrice = useMemo(() => Math.max(...services.map(s => s.price)), []);

  const applyFilters = () => {
    let tempServices = services;

    if (category !== 'all') {
      tempServices = tempServices.filter(service => service.category === category);
    }

    tempServices = tempServices.filter(service => service.price <= priceRange[0]);

    if (rating !== 'all') {
      tempServices = tempServices.filter(service => service.rating >= parseInt(rating));
    }

    setFilteredServices(tempServices);
  };
  
  const resetFilters = () => {
    setCategory('all');
    setPriceRange([maxPrice]);
    setRating('all');
    setFilteredServices(services);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-card p-6 rounded-xl shadow-sm h-fit">
          <h2 className="text-2xl font-headline font-semibold mb-6">Filters</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-lg font-medium mb-2 block font-headline">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price-range" className="text-lg font-medium mb-2 block font-headline">
                Max Price: <span className="font-bold text-primary">${priceRange[0]}</span>
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={maxPrice}
                step={10}
                value={priceRange}
                onValueChange={(value: [number]) => setPriceRange(value)}
              />
            </div>

            <div>
              <Label className="text-lg font-medium mb-2 block font-headline">Rating</Label>
              <RadioGroup value={rating} onValueChange={setRating}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="all" id="r-all" />
                  <Label htmlFor="r-all">All</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="r-4" />
                  <Label htmlFor="r-4">4 stars & up</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="r-3" />
                  <Label htmlFor="r-3">3 stars & up</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r-2" />
                  <Label htmlFor="r-2">2 stars & up</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex flex-col space-y-2 pt-4">
              <Button onClick={applyFilters}>Apply Filters</Button>
              <Button onClick={resetFilters} variant="ghost">Reset Filters</Button>
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          <h1 className="text-4xl font-bold mb-8 font-headline">Explore Services</h1>
          {filteredServices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredServices.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-card rounded-xl">
                <p className="text-muted-foreground text-lg">No services found matching your criteria.</p>
                <Button onClick={resetFilters} className="mt-4">Clear filters</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
