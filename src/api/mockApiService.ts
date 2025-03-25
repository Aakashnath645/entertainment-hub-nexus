
import { Post, mockPosts, Author } from '@/utils/mockData';
import { v4 as uuidv4 } from 'uuid';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPosts = async (): Promise<Post[]> => {
  await delay(800); // Simulate network delay
  return [...mockPosts];
};

export const fetchPostById = async (id: string): Promise<Post | undefined> => {
  await delay(600);
  return mockPosts.find(post => post.id === id);
};

export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {
  await delay(1000);
  const newPost = { ...post, id: uuidv4() };
  mockPosts.unshift(newPost);
  return newPost;
};

export const updatePost = async (updatedPost: Post): Promise<Post> => {
  await delay(800);
  const index = mockPosts.findIndex(post => post.id === updatedPost.id);
  if (index !== -1) {
    mockPosts[index] = updatedPost;
    return updatedPost;
  }
  throw new Error('Post not found');
};

export const deletePost = async (id: string): Promise<boolean> => {
  await delay(700);
  const index = mockPosts.findIndex(post => post.id === id);
  if (index !== -1) {
    mockPosts.splice(index, 1);
    return true;
  }
  return false;
};

export const fetchPostsByCategory = async (category: string): Promise<Post[]> => {
  await delay(600);
  return mockPosts.filter(post => post.category === category);
};

export const fetchPopularPosts = async (): Promise<Post[]> => {
  await delay(500);
  return mockPosts.filter(post => post.popular);
};

export const fetchFeaturedPosts = async (): Promise<Post[]> => {
  await delay(500);
  return mockPosts.filter(post => post.featured);
};

export const fetchTrendingPosts = async (): Promise<Post[]> => {
  await delay(500);
  return mockPosts.filter(post => post.trending);
};
