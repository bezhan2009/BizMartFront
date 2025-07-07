"use client";

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { users, services as allServices } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, Star, Briefcase } from 'lucide-react';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = users.find((u) => u.username === params.username);

  if (!user) {
    notFound();
  }

  const userServices = allServices.filter(s => s.provider.username === user.username);
  const totalReviews = userServices.reduce((acc, s) => acc + s.reviewsCount, 0);
  const averageRating = userServices.length > 0
    ? (userServices.reduce((acc, s) => acc + s.rating * s.reviewsCount, 0) / totalReviews).toFixed(1)
    : 'N/A';

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8 overflow-hidden">
        <div className="h-48 bg-muted relative">
           <Image src="https://placehold.co/1200x200.png" alt="Profile banner" layout="fill" objectFit="cover" data-ai-hint="abstract background"/>
        </div>
        <CardContent className="p-6 pt-0">
          <div className="flex flex-col md:flex-row items-start gap-6 -mt-16">
            <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-primary">
              <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="user avatar" />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="pt-16 w-full">
              <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-foreground/80">{user.bio}</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted rounded-lg">
              <Briefcase className="h-6 w-6 mx-auto mb-1 text-primary"/>
              <p className="text-xl font-bold">{userServices.length}</p>
              <p className="text-sm text-muted-foreground">Services</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Star className="h-6 w-6 mx-auto mb-1 text-primary"/>
              <p className="text-xl font-bold">{averageRating}</p>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <Briefcase className="h-6 w-6 mx-auto mb-1 text-primary"/>
              <p className="text-xl font-bold">{totalReviews}</p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-3xl font-bold mb-6 font-headline">Services by {user.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userServices.length > 0 ? (
            userServices.map(service => <ServiceCard key={service.id} service={service} />)
          ) : (
            <p className="text-muted-foreground col-span-full">This user has no services listed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
