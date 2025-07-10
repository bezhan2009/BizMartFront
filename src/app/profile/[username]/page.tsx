"use client";

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { users, services as allServices, reviews as allReviewsData } from '@/lib/data';
import ServiceCard from '@/components/service-card';
import ReviewCard from '@/components/review-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, UserPlus, UserCheck, Edit, Grid3x3, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/hooks/use-auth';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage({ params }: { params: { username: string } }) {
  const { user: authUser } = useAuth();
  const user = users.find((u) => u.username === params.username);

  if (!user) {
    notFound();
  }
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(user.followers);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const isOwnProfile = authUser?.username === user.username;
  const userServices = allServices.filter(s => s.provider.username === user.username);
  const userReviews = allReviewsData.filter(r => r.providerId === user.id);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
        <Avatar className="h-32 w-32 border-4 border-background ring-4 ring-primary shrink-0">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-grow w-full">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold font-headline">{user.username}</h2>
            <div className="flex items-center gap-2">
              {isOwnProfile ? (
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              ) : (
                <Button onClick={handleFollow} variant={isFollowing ? 'secondary' : 'default'} className="transition-colors">
                  {isFollowing ? <UserCheck className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-6 mb-4 text-center">
            <div>
                <p className="text-xl font-bold">{userServices.length}</p>
                <p className="text-sm text-muted-foreground">Services</p>
            </div>
            <div>
                <p className="text-xl font-bold">{followerCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div>
                <p className="text-xl font-bold">{user.following.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>

          <div>
             <h1 className="text-xl font-semibold">{user.name}</h1>
             <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            <p className="mt-2 text-foreground/80">{user.bio}</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-96 mx-auto">
          <TabsTrigger value="posts"><Grid3x3 className="mr-2 h-4 w-4"/> Services</TabsTrigger>
          <TabsTrigger value="reviews"><MessageSquare className="mr-2 h-4 w-4"/> Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="posts" className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {userServices.length > 0 ? (
                userServices.map(service => <ServiceCard key={service.id} service={service} />)
              ) : (
                <div className="col-span-full text-center py-20 bg-card rounded-xl">
                    <Grid3x3 className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2 font-headline">No Services Yet</h3>
                    <p className="text-muted-foreground">This user hasn't listed any services.</p>
                </div>
              )}
            </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-8">
          <div className="space-y-6">
            {userReviews.length > 0 ? (
              userReviews.map(review => <ReviewCard key={review.id} review={review} />)
            ) : (
                <div className="col-span-full text-center py-20 bg-card rounded-xl">
                    <MessageSquare className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2 font-headline">No Reviews Yet</h3>
                    <p className="text-muted-foreground">This user doesn't have any reviews.</p>
                </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
