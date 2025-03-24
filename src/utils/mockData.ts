
export type Category = 'movie' | 'game' | 'tech';

export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  imageUrl: string;
  author: Author;
  date: string;
  readTime: number;
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
  scheduledDate?: Date;
}

// Initial demo author
export const demoAuthor: Author = {
  id: 'admin',
  name: 'Admin User',
  avatar: '/placeholder.svg',
  bio: 'Content creator and editor for this entertainment blog.',
  role: 'Editor'
};

// Empty posts array - we'll add real content through the admin interface
export const posts: Post[] = [];

// Sample hero post for the homepage
export const heroPost: Post = {
  id: 'hero-post',
  title: 'Welcome to the Entertainment Blog',
  excerpt: 'A place for all your entertainment news, reviews, and insights.',
  content: 'This is a placeholder for the hero post content. Add real content through the admin interface.',
  category: 'tech',
  imageUrl: '/placeholder.svg',
  author: demoAuthor,
  date: new Date().toISOString(),
  readTime: 5
};

export const trendingTopics = [
  { id: '1', name: 'Superhero Films', count: 0 },
  { id: '2', name: 'AI in Gaming', count: 0 },
  { id: '3', name: 'Virtual Reality', count: 0 },
  { id: '4', name: 'Indie Games', count: 0 },
  { id: '5', name: 'Streaming Wars', count: 0 }
];

export const mockPosts = posts;

export const getPostsByCategory = (category: Category): Post[] => {
  return posts.filter(post => post.category === category);
};

export const getFeaturedPosts = (): Post[] => {
  return posts.filter(post => post.featured);
};

export const getTrendingPosts = (): Post[] => {
  return posts.filter(post => post.trending);
};

export const getPopularPosts = (): Post[] => {
  return posts.filter(post => post.popular);
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};
