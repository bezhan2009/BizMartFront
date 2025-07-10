'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { users, services as allServices } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import { AtSign, Edit, MapPin, UserPlus, UserCheck } from 'lucide-react';
import { useState } from 'react';
import ReviewCard from '@/components/review-card';
import type { Review } from '@/lib/types';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const user = users.find(u => u.username === username);
  const userServices = allServices.filter(s => s.provider.username === username);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold">User not found</h1>
          <p className="mt-2 text-muted-foreground">
            The user profile you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const reviews: Review[] = [
    {
      id: '1',
      providerId: user.id,
      author: { name: 'Jane Doe', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
      rating: 5,
      comment:
        'Absolutely phenomenal work! The attention to detail was incredible.',
      date: '2023-01-15',
    },
    {
      id: '2',
      providerId: user.id,
      author: { name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a' },
      rating: 4,
      comment: 'Great service and very professional. Highly recommended.',
      date: '2023-02-20',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
          <div className="relative">
            <Image
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              width={120}
              height={120}
              className="rounded-full object-cover border-4 border-background"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <Button size="sm" variant="outline" onClick={toggleFollow}>
                {isFollowing ? (
                  <UserCheck className="mr-2 h-4 w-4" />
                ) : (
                  <UserPlus className="mr-2 h-4 w-4" />
                )}
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button size="sm" variant="secondary">
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
              </Button>
            </div>
            <div className="flex justify-center md:justify-start space-x-6 text-muted-foreground mb-4">
              <span>
                <span className="font-bold text-foreground">
                  {userServices.length}
                </span>{' '}
                Services
              </span>
              <span>
                <span className="font-bold text-foreground">
                  {user.followers}
                </span>{' '}
                Followers
              </span>
              <span>
                <span className="font-bold text-foreground">
                  {user.following}
                </span>{' '}
                Following
              </span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-1">
              <AtSign size={16} />
              <span>{user.username}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-2">
              <MapPin size={16} />
              <span>{user.location}</span>
            </div>
            <p className="text-center md:text-left">{user.bio}</p>
          </div>
        </header>

        <Tabs defaultValue="services" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="services">
            {userServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {userServices.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold">No Services Yet</h3>
                <p className="text-muted-foreground mt-2">
                  This user hasn't listed any services.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="reviews">
            <div className="space-y-6 mt-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
