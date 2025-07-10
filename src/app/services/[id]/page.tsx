"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { services, reviews as allReviews } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, MessageSquare, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (!service) {
    notFound();
  }

  const favorite = isFavorite(service.id);

  const handleFavoriteClick = () => {
    if (favorite) {
      removeFavorite(service.id);
    } else {
      addFavorite(service.id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-2 font-headline">{service.title}</h1>
          <div className="flex items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="font-bold text-foreground">{service.rating.toFixed(1)}</span>
              <span>({service.reviewsCount} reviews)</span>
            </div>
            <span>·</span>
            <Link href={`/profile/${service.provider.username}`} className="hover:text-primary transition-colors flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={service.provider.avatar} />
                <AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>{service.provider.name}</span>
            </Link>
          </div>

          <Carousel className="w-full mb-8">
            <CarouselContent>
              {service.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden rounded-xl">
                    <Image
                      src={img}
                      alt={`${service.title} - image ${index + 1}`}
                      width={800}
                      height={500}
                      className="w-full h-auto aspect-video object-cover"
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>

          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold font-headline">About this service</h2>
            <p>{service.description}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 font-headline">What people are saying</h2>
            <div className="space-y-6">
              {allReviews.slice(0, 3).map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src={review.author.avatar} />
                                <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{review.author.name}</p>
                                <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground/30'}`} />
                            ))}
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <Card className="sticky top-24 p-6 rounded-xl shadow-sm">
            <CardTitle className="text-2xl mb-4 font-headline flex justify-between items-center">
              <span>{service.category}</span>
              <span className="text-3xl font-bold text-foreground">${service.price}</span>
            </CardTitle>
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-6">Starting price for a standard project.</p>
              <div className="flex flex-col gap-3">
                <Button size="lg" asChild>
                  <Link href="/chat">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Message Provider
                  </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={handleFavoriteClick}>
                  <Heart className={`mr-2 h-5 w-5 ${favorite ? 'text-rose-500 fill-current' : ''}`} />
                  {favorite ? 'Saved to Favorites' : 'Save to Favorites'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
