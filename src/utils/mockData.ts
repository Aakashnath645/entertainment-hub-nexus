
export type Category = 'movie' | 'game' | 'tech';

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  imageUrl: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
}

export const heroPost: Post = {
  id: '1',
  title: 'Next-Gen Gaming: How AI Will Revolutionize Your Gameplay Experience',
  excerpt: 'The future of gaming is here with AI-driven experiences that adapt to your playstyle.',
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
  category: 'game',
  imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
  author: {
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  date: '2023-05-15',
  readTime: 8,
  featured: true,
  trending: true,
};

export const posts: Post[] = [
  heroPost,
  {
    id: '2',
    title: 'Dune: Part Two - A Visual Masterpiece That Expands the Universe',
    excerpt: 'Denis Villeneuve returns with an epic continuation that delivers on all fronts.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'movie',
    imageUrl: 'https://images.unsplash.com/photo-1630517481487-8f2391d71e1f?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Samantha Lee',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    date: '2023-05-12',
    readTime: 6,
    featured: true,
  },
  {
    id: '3',
    title: 'Apple Vision Pro: Redefining Spatial Computing',
    excerpt: 'Hands-on with Apple's revolutionary new device that merges digital content with the physical world.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=2069&auto=format&fit=crop',
    author: {
      name: 'David Chen',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    date: '2023-05-10',
    readTime: 7,
    featured: true,
  },
  {
    id: '4',
    title: 'Inside Elden Ring's Massive DLC: Shadow of the Erdtree',
    excerpt: 'FromSoftware expands its masterpiece with challenging new areas and bosses.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'game',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    author: {
      name: 'Marcus Reed',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    },
    date: '2023-05-08',
    readTime: 5,
    popular: true,
  },
  {
    id: '5',
    title: 'The 10 Most Anticipated Movies of 2024',
    excerpt: 'From superhero epics to indie darlings, these are the films you won't want to miss.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'movie',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2025&auto=format&fit=crop',
    author: {
      name: 'Jasmine Wong',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    },
    date: '2023-05-05',
    readTime: 10,
    popular: true,
  },
  {
    id: '6',
    title: 'Quantum Computing Explained: The Next Tech Revolution',
    excerpt: 'How quantum computers will change everything from medicine to AI.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1934&auto=format&fit=crop',
    author: {
      name: 'Ryan Black',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg',
    },
    date: '2023-05-03',
    readTime: 8,
    popular: true,
  },
  {
    id: '7',
    title: 'The Evolution of Christopher Nolan: From Memento to Oppenheimer',
    excerpt: 'Tracking the career of one of cinema's most innovative directors.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'movie',
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    date: '2023-04-28',
    readTime: 12,
    trending: true,
  },
  {
    id: '8',
    title: 'How Indie Games Are Changing the Industry',
    excerpt: 'Small studios are making a big impact with innovative gameplay and storytelling.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'game',
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Omar Hakeem',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    },
    date: '2023-04-25',
    readTime: 7,
    trending: true,
  },
  {
    id: '9',
    title: 'The Dark Side of Social Media: New Research Reveals Impact on Mental Health',
    excerpt: 'Studies show concerning trends in how platforms affect young users.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop',
    author: {
      name: 'Leila Patel',
      avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    },
    date: '2023-04-22',
    readTime: 9,
    trending: true,
  },
  {
    id: '10',
    title: 'Barbenheimer: The Cultural Phenomenon That Defined Summer 2023',
    excerpt: 'How two wildly different films created the biggest movie event in years.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.',
    category: 'movie',
    imageUrl: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop',
    author: {
      name: 'Chris Thompson',
      avatar: 'https://randomuser.me/api/portraits/men/91.jpg',
    },
    date: '2023-04-18',
    readTime: 11,
    trending: true,
  },
];

export const trendingTopics = [
  { id: '1', name: 'Superhero Films', count: 26 },
  { id: '2', name: 'AI in Gaming', count: 18 },
  { id: '3', name: 'Virtual Reality', count: 15 },
  { id: '4', name: 'Indie Games', count: 12 },
  { id: '5', name: 'Streaming Wars', count: 10 },
];

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
