import type { User, Service } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    username: 'alicej',
    email: 'alice@example.com',
    location: 'New York, NY',
    bio: 'Full-stack developer with a passion for creating beautiful and functional web applications.',
    avatar: 'https://placehold.co/120x120.png',
    avatarHint: 'woman portrait',
    followers: 1200,
    following: 340,
    services: ['1', '2'],
  },
  {
    id: '2',
    name: 'Bob Williams',
    username: 'bobw',
    email: 'bob@example.com',
    location: 'San Francisco, CA',
    bio: 'Graphic designer specializing in branding and UI/UX. Let’s create something amazing together.',
    avatar: 'https://placehold.co/120x120.png',
    avatarHint: 'man portrait business',
    followers: 850,
    following: 150,
    services: ['3', '4'],
  },
  {
    id: '3',
    name: 'Charlie Brown',
    username: 'charlieb',
    email: 'charlie@example.com',
    location: 'Austin, TX',
    bio: 'Marketing strategist helping businesses grow their online presence.',
    avatar: 'https://placehold.co/120x120.png',
    avatarHint: 'person casual',
    followers: 2500,
    following: 500,
    services: ['5'],
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Modern Web Design',
    category: 'Web Development',
    description:
      'I will create a stunning, responsive, and user-friendly website for your business.',
    price: 1500,
    rating: 4.9,
    reviewCount: 89,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'web design computer',
    isFeatured: true,
    userId: '1',
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    category: 'Web Development',
    description:
      'Complete e-commerce solution with payment gateway integration and product management.',
    price: 3000,
    rating: 4.8,
    reviewCount: 120,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'online shopping cart',
    userId: '1',
  },
  {
    id: '3',
    title: 'Company Logo Design',
    category: 'Graphic Design',
    description:
      'I will design a unique and memorable logo that represents your brand identity.',
    price: 500,
    rating: 4.9,
    reviewCount: 250,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'logo design art',
    isFeatured: true,
    userId: '2',
  },
  {
    id: '4',
    title: 'Social Media Kit',
    category: 'Graphic Design',
    description:
      'Professionally designed graphics for all your social media platforms.',
    price: 300,
    rating: 4.7,
    reviewCount: 180,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'social media icons',
    userId: '2',
  },
  {
    id: '5',
    title: 'Digital Marketing Strategy',
    category: 'Marketing',
    description:
      'A complete marketing plan to boost your online presence and drive sales.',
    price: 2000,
    rating: 4.9,
    reviewCount: 310,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'marketing chart analytics',
    userId: '3',
  },
  {
    id: '6',
    title: 'Professional Photography',
    category: 'Photography',
    description:
      'High-quality photos for your products, events, or personal branding.',
    price: 800,
    rating: 5.0,
    reviewCount: 95,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'person camera',
    userId: '1',
  },
  {
    id: '7',
    title: 'Home Cleaning Service',
    category: 'Home Services',
    description: 'Reliable and thorough cleaning for your home or office.',
    price: 150,
    rating: 4.8,
    reviewCount: 215,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'home cleaning spray',
    userId: '2',
  },
  {
    id: '8',
    title: 'Personal Fitness Training',
    category: 'Health & Fitness',
    description: 'Customized fitness plans and one-on-one training sessions.',
    price: 70,
    rating: 4.9,
    reviewCount: 150,
    image: 'https://placehold.co/400x300.png',
    imageHint: 'fitness gym',
    isFeatured: true,
    userId: '3',
  },
];

export const getServices = () => services;

export const getServiceById = (id: string) =>
  services.find((s) => s.id === id);

export const getUsers = () => users;

export const getUserById = (id: string) => users.find((u) => u.id === id);

export const getUserByUsername = (username: string) =>
  users.find((u) => u.username === username);

export const getServicesByUserId = (userId: string) =>
  services.filter((s) => s.userId === userId);
