"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Heart, Star, Award } from 'lucide-react';
import type { Service } from '@/lib/types';
import { useFavorites } from '@/hooks/use-favorites';
import { Badge } from './ui/badge';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(service.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    favorite ? removeFavorite(service.id) : addFavorite(service.id);
  };

  return (
    <Link href={`/services/${service.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={service.images[0]}
            alt={service.title}
            width={400}
            height={400}
            className="w-full h-auto aspect-square object-cover"
            data-ai-hint="service work"
          />
          {service.featured && (
            <Badge className="absolute top-2 left-2" variant="default">
              <Award className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 bg-white/70 hover:bg-white rounded-full text-rose-500"
            onClick={handleFavoriteClick}
          >
            <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
          </Button>
        </CardHeader>

        <CardContent className="p-4 flex-grow">
          <Link
            href={`/profile/${service.provider.username}`}
            className="flex items-center gap-2 mb-2 group-hover:text-primary transition-colors"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage
                src={service.provider.avatar}
                alt={service.provider.name}
                data-ai-hint="user avatar"
              />
              <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium text-muted-foreground group-hover:text-primary">
              {service.provider.name}
            </p>
          </Link>
          <CardTitle className="text-lg font-headline leading-tight h-12">
            {service.title}
          </CardTitle>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center border-t mt-auto">
          <div className="flex items-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span>{service.rating.toFixed(1)}</span>
            <span className="text-muted-foreground font-normal">
              ({service.reviewsCount})
            </span>
          </div>
          <div className="text-lg font-semibold text-foreground">
            <span className="text-xs font-normal text-muted-foreground">FROM </span>$
            {service.price}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
