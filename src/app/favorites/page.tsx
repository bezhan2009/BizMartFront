"use client";

import ServiceCard from '@/components/service-card';
import { useFavorites } from '@/hooks/use-favorites';
import { services } from '@/lib/data';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();
  const favoriteServices = services.filter(service => favoriteIds.includes(service.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Heart className="h-8 w-8 text-primary" />
        <h1 className="text-4xl font-bold font-headline">My Favorites</h1>
      </div>

      {favoriteServices.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favoriteServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-card rounded-xl flex flex-col items-center justify-center">
            <Heart className="h-16 w-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-semibold mb-2 font-headline">No Favorites Yet</h2>
          <p className="text-muted-foreground mb-6">Click the heart on any service to save it here.</p>
          <Button asChild>
            <Link href="/">Explore Services</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
