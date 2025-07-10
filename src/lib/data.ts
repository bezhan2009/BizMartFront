
import type { User, Service, Review, Category, Conversation } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    username: 'alicej',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    location: 'San Francisco, CA',
    bio: 'Experienced web developer specializing in React and Next.js. I create beautiful and performant websites for businesses of all sizes.',
    services: ['service-1', 'service-2'],
    reviews: [],
    followers: 1250,
    following: 180,
  },
  {
    id: 'user-2',
    name: 'Bob Williams',
    username: 'bobw',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1603415526960-fb0bdd25e347',
    location: 'New York, NY',
    bio: 'Graphic designer with a passion for creating stunning logos and branding materials. Let\'s make your brand stand out!',
    services: ['service-3'],
    reviews: [],
    followers: 840,
    following: 320,
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    username: 'charlieb',
    role: 'provider',
    avatar: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a9',
    location: 'Austin, TX',
    bio: 'I write compelling copy that converts. From blog posts to website content, I can help you communicate your message effectively.',
    services: ['service-4'],
    reviews: [],
    followers: 530,
    following: 95,
  },
   {
    id: 'user-4',
    name: 'Diana Prince',
    username: 'dianap',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    location: 'Chicago, IL',
    bio: 'Looking for the best creative talent for my upcoming projects.',
    services: [],
    reviews: [],
    followers: 50,
    following: 15,
  },
];

export const reviews: Review[] = [
    { id: 'rev-1', providerId: 'user-1', author: { name: 'Client A', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' }, rating: 5, comment: 'Amazing work, delivered on time!', date: '2023-10-01' },
    { id: 'rev-2', providerId: 'user-1', author: { name: 'Client B', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a' }, rating: 4, comment: 'Great communication and high-quality results.', date: '2023-09-22' },
    { id: 'rev-3', providerId: 'user-2', author: { name: 'Client C', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' }, rating: 5, comment: 'Exceeded my expectations. Highly recommended.', date: '2023-11-05' },
    { id: 'rev-4', providerId: 'user-3', author: { name: 'Client D', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }, rating: 3, comment: 'Good work, but took a bit longer than expected.', date: '2023-10-15' },
    { id: 'rev-5', providerId: 'user-1', author: { name: 'Client E', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956' }, rating: 5, comment: 'Alice is a true professional. Will hire again!', date: '2023-11-10' },
];

export const services: Service[] = [
  {
    id: 'service-1',
    title: 'Custom Website Development',
    description: 'Full-stack website development using the latest technologies. We will build a responsive, fast, and SEO-friendly website from scratch based on your requirements. Includes design mockups, development, and deployment.',
    category: 'Web Development',
    price: 450,
    rating: 4.9,
    reviewsCount: 8,
    images: ['https://images.unsplash.com/photo-1521791136064-7986c2920216', 'https://images.unsplash.com/photo-1551434678-e076c223a692', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'],
    provider: { name: users[0].name, username: users[0].username, avatar: users[0].avatar },
    featured: true,
    analytics: { views: 1250, likes: 230, revenue: 4500 }
  },
  {
    id: 'service-2',
    title: 'E-commerce Store Setup',
    description: 'Get your online store up and running with Shopify or WooCommerce. This service includes theme customization, product uploads, payment gateway integration, and basic SEO setup to help you start selling online.',
    category: 'Web Development',
    price: 380,
    rating: 4.8,
    reviewsCount: 12,
    images: ['https://images.unsplash.com/photo-1557800636-894a64c1696f', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3'],
    provider: { name: users[0].name, username: users[0].username, avatar: users[0].avatar },
    analytics: { views: 890, likes: 180, revenue: 3800 }
  },
  {
    id: 'service-3',
    title: 'Professional Logo Design',
    description: 'I will design a unique and memorable logo for your brand. You will receive multiple concepts and revisions to ensure the final design perfectly represents your business values and identity.',
    category: 'Graphic Design',
    price: 150,
    rating: 5.0,
    reviewsCount: 25,
    images: ['https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d'],
    provider: { name: users[1].name, username: users[1].username, avatar: users[1].avatar },
    analytics: { views: 2100, likes: 450, revenue: 6750 }
  },
  {
    id: 'service-4',
    title: 'SEO Blog Post Writing',
    description: 'Engaging and SEO-optimized blog posts to drive traffic to your site. Each article is well-researched, written in your brand\'s voice, and formatted for readability. Keywords will be naturally integrated.',
    category: 'Writing',
    price: 80,
    rating: 4.7,
    reviewsCount: 42,
    images: ['https://images.unsplash.com/photo-1515378791036-0648a3ef77b2', 'https://images.unsplash.com/photo-1499750310107-5fef28a66643'],
    provider: { name: users[2].name, username: users[2].username, avatar: users[2].avatar },
    analytics: { views: 3500, likes: 600, revenue: 3360 }
  },
  {
    id: 'service-5',
    title: 'Social Media Management',
    description: 'Complete management of your social media profiles (Instagram, Facebook, Twitter). Includes content creation, posting schedule, community engagement, and monthly performance reports to grow your online presence.',
    category: 'Marketing',
    price: 300,
    rating: 4.9,
    reviewsCount: 15,
    images: ['https://images.unsplash.com/photo-1519389950473-47ba0277781c'],
    provider: { name: users[1].name, username: users[1].username, avatar: users[1].avatar },
    featured: true,
    analytics: { views: 1800, likes: 320, revenue: 4500 }
  },
  {
    id: 'service-6',
    title: 'Mobile App UI/UX Design',
    description: 'User-centric UI/UX design for iOS and Android applications. I will create intuitive wireframes, interactive prototypes, and pixel-perfect visual designs that provide a seamless user experience.',
    category: 'Graphic Design',
    price: 500,
    rating: 4.9,
    reviewsCount: 9,
    images: ['https://images.unsplash.com/photo-1519241047957-be31d7379a5d', 'https://images.unsplash.com/photo-1555774698-0b77e0abfe3d'],
    provider: { name: users[0].name, username: users[0].username, avatar: users[0].avatar },
     analytics: { views: 1100, likes: 200, revenue: 4000 }
  },
];

export const categories: Category[] = [
    { id: 'cat-1', name: 'Web Development' },
    { id: 'cat-2', name: 'Graphic Design' },
    { id: 'cat-3', name: 'Writing' },
    { id: 'cat-4', name: 'Marketing' },
];

export const conversations: Conversation[] = [
    {
        id: 'conv-1',
        participant: { name: 'Alice Johnson', avatar: users[0].avatar },
        lastMessage: 'Sounds great, I will get started on the mockups.',
        timestamp: '10:42 AM',
        messages: [
            { id: 'msg-1-1', sender: 'other', text: 'Hi! I saw your profile and I\'m interested in a new website for my cafe.', timestamp: '10:30 AM' },
            { id: 'msg-1-2', sender: 'me', text: 'Hello! Thanks for reaching out. I\'d love to help. Do you have any existing website or design ideas?', timestamp: '10:31 AM' },
            { id: 'msg-1-3', sender: 'other', text: 'Not really, I was hoping you could help with that too.', timestamp: '10:40 AM' },
            { id: 'msg-1-4', sender: 'me', text: 'Absolutely. I can create a full design proposal for you.', timestamp: '10:41 AM' },
            { id: 'msg-1-5', sender: 'other', text: 'Sounds great, I will get started on the mockups.', timestamp: '10:42 AM' },
        ]
    },
    {
        id: 'conv-2',
        participant: { name: 'Bob Williams', avatar: users[1].avatar },
        lastMessage: 'Perfect, looking forward to the concepts.',
        timestamp: 'Yesterday',
        messages: [
            { id: 'msg-2-1', sender: 'me', text: 'Hi Bob, I need a new logo for my startup.', timestamp: 'Yesterday' },
            { id: 'msg-2-2', sender: 'other', text: 'Hi! I can definitely help with that. What is your startup about?', timestamp: 'Yesterday' },
        ]
    }
];

export const getUserByUsername = (username: string) => users.find(u => u.username === username);
export const getServicesByUserId = (userId: string) => services.filter(s => s.provider.name === users.find(u => u.id === userId)?.name);
