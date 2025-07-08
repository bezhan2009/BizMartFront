import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Heart } from 'lucide-react';

import type { Service } from '@/lib/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.id}`} className="group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <Image
            src={service.image}
            alt={service.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={service.imageHint}
          />
          {service.isFeatured && (
            <Badge
              variant="default"
              className="absolute top-3 right-3 bg-primary text-primary-foreground"
            >
              <Star className="mr-1 h-3 w-3" />
              Featured
            </Badge>
          )}
          <div className="absolute top-3 left-3">
            <button className="p-2 bg-background/70 backdrop-blur-sm rounded-full text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold leading-tight mb-2 group-hover:text-primary transition-colors">
            {service.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{service.category}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center border-t">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-semibold">{service.rating}</span>
            <span className="text-xs text-muted-foreground ml-1">
              ({service.reviewCount})
            </span>
          </div>
          <div className="text-lg font-bold text-primary">
            ${service.price}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
