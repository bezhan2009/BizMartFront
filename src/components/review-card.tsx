"use client";

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage src={review.author.avatar} data-ai-hint={review.author.avatarHint} />
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
  );
}
