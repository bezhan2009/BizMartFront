export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  imageHint: string;
  isFeatured?: boolean;
  userId: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
  avatarHint: string;
  followers: number;
  following: number;
  services: string[];
}
