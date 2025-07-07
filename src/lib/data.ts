import type { User, Service, Review, Category, Conversation } from './types';

export const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    username: 'alicej',
    avatar: 'https://placehold.co/100x100/008080/FFFFFF/png',
    location: 'San Francisco, CA',
    bio: 'Experienced web developer specializing in React and Next.js. I create beautiful and performant websites for businesses of all sizes.',
    services: ['service-1', 'service-2'],
    reviews: [],
  },
  {
    id: 'user-2',
    name: 'Bob Williams',
    username: 'bobw',
    avatar: 'https://placehold.co/100x100/333333/FFFFFF/png',
    location: 'New York, NY',
    bio: 'Graphic designer with a passion for creating stunning logos and branding materials. Let\'s make your brand stand out!',
    services: ['service-3'],
    reviews: [],
  },
  {
    id: 'user-3',
    name: 'Charlie Brown',
    username: 'charlieb',
    avatar: 'https://placehold.co/100x100/F9F9F9/333333/png',
    location: 'Austin, TX',
    bio: 'I write compelling copy that converts. From blog posts to website content, I can help you communicate your message effectively.',
    services: ['service-4'],
    reviews: [],
  },
];

export const reviews: Review[] = [
    { id: 'rev-1', author: { name: 'Client A', avatar: 'https://placehold.co/40x40.png' }, rating: 5, comment: 'Amazing work, delivered on time!', date: '2023-10-01' },
    { id: 'rev-2', author: { name: 'Client B', avatar: 'https://placehold.co/40x40.png' }, rating: 4, comment: 'Great communication and high-quality results.', date: '2023-09-22' },
    { id: 'rev-3', author: { name: 'Client C', avatar: 'https://placehold.co/40x40.png' }, rating: 5, comment: 'Exceeded my expectations. Highly recommended.', date: '2023-11-05' },
    { id: 'rev-4', author: { name: 'Client D', avatar: 'https://placehold.co/40x40.png' }, rating: 3, comment: 'Good work, but took a bit longer than expected.', date: '2023-10-15' },
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
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    provider: { name: users[0].name, username: users[0].username, avatar: users[0].avatar },
  },
  {
    id: 'service-2',
    title: 'E-commerce Store Setup',
    description: 'Get your online store up and running with Shopify or WooCommerce. This service includes theme customization, product uploads, payment gateway integration, and basic SEO setup to help you start selling online.',
    category: 'Web Development',
    price: 380,
    rating: 4.8,
    reviewsCount: 12,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    provider: { name: users[0].name, username: users[0].username, avatar: users[0].avatar },
  },
  {
    id: 'service-3',
    title: 'Professional Logo Design',
    description: 'I will design a unique and memorable logo for your brand. You will receive multiple concepts and revisions to ensure the final design perfectly represents your business values and identity.',
    category: 'Graphic Design',
    price: 150,
    rating: 5.0,
    reviewsCount: 25,
    images: ['https://placehold.co/600x400.png'],
    provider: { name: users[1].name, username: users[1].username, avatar: users[1].avatar },
  },
  {
    id: 'service-4',
    title: 'SEO Blog Post Writing',
    description: 'Engaging and SEO-optimized blog posts to drive traffic to your site. Each article is well-researched, written in your brand\'s voice, and formatted for readability. Keywords will be naturally integrated.',
    category: 'Writing',
    price: 80,
    rating: 4.7,
    reviewsCount: 42,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    provider: { name: users[2].name, username: users[2].username, avatar: users[2].avatar },
  },
  {
    id: 'service-5',
    title: 'Social Media Management',
    description: 'Complete management of your social media profiles (Instagram, Facebook, Twitter). Includes content creation, posting schedule, community engagement, and monthly performance reports to grow your online presence.',
    category: 'Marketing',
    price: 300,
    rating: 4.9,
    reviewsCount: 15,
    images: ['https://placehold.co/600x400.png'],
    provider: { name: users[1].name, username: users[1].username, avatar: users[1].avatar },
  },
  {
    id: 'service-6',
    title: 'Mobile App UI/UX Design',
    description: 'User-centric UI/UX design for iOS and Android applications. I will create intuitive wireframes, interactive prototypes, and pixel-perfect visual designs that provide a seamless user experience.',
    category: 'Graphic Design',
    price: 500,
    rating: 4.9,
    reviewsCount: 9,
    images: ['https://placehold.co/600x400.png', 'https://placehold.co/600x400.png'],
    provider: { name: users[0].name, username: users[0].username, avatar: users[0].avatar },
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
]
