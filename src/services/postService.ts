
import { supabase } from '@/integrations/supabase/client';
import type { Author } from '@/utils/mockData';
import { toast } from 'sonner';

export type Category = 'movie' | 'game' | 'tech' | 'series' | 'comics';
export type PostStatus = 'draft' | 'published' | 'scheduled';

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
  status: PostStatus;
  scheduledDate?: Date | null;
}

export interface DatabasePost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  image_url: string;
  author_id: string;
  date: string;
  read_time: number;
  featured: boolean;
  trending: boolean;
  popular: boolean;
  status: PostStatus;
  scheduled_date?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthorProfile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  role: string;
  social?: {
    twitter?: string | null;
    linkedin?: string | null;
    website?: string | null;
  };
}

export const transformPost = async (dbPost: DatabasePost): Promise<Post> => {
  const { data: authorProfile, error: authorError } = await supabase
    .from('author_profiles')
    .select('*')
    .eq('id', dbPost.author_id)
    .single();

  if (authorError) {
    console.error("Error fetching author:", authorError);
    const author: Author = {
      id: dbPost.author_id,
      name: 'Unknown Author',
      avatar: '/placeholder.svg',
      bio: '',
      role: 'Contributor'
    };
    
    return {
      id: dbPost.id,
      title: dbPost.title,
      excerpt: dbPost.excerpt,
      content: dbPost.content,
      category: dbPost.category,
      imageUrl: dbPost.image_url,
      author,
      date: dbPost.date,
      readTime: dbPost.read_time,
      featured: dbPost.featured,
      trending: dbPost.trending,
      popular: dbPost.popular,
      status: dbPost.status,
      scheduledDate: dbPost.scheduled_date ? new Date(dbPost.scheduled_date) : null
    };
  }

  const socialData = authorProfile.social as any;
  const social = socialData ? {
    twitter: socialData.twitter || null,
    linkedin: socialData.linkedin || null,
    website: socialData.website || null
  } : undefined;

  const author: Author = {
    id: authorProfile.id,
    name: authorProfile.name,
    avatar: authorProfile.avatar,
    bio: authorProfile.bio,
    role: authorProfile.role,
    social
  };

  return {
    id: dbPost.id,
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    content: dbPost.content,
    category: dbPost.category,
    imageUrl: dbPost.image_url,
    author,
    date: dbPost.date,
    readTime: dbPost.read_time,
    featured: dbPost.featured,
    trending: dbPost.trending,
    popular: dbPost.popular,
    status: dbPost.status,
    scheduledDate: dbPost.scheduled_date ? new Date(dbPost.scheduled_date) : null
  };
};

export const transformToDbPost = (post: Post, authorId: string): Omit<DatabasePost, 'id' | 'created_at' | 'updated_at'> => {
  return {
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    image_url: post.imageUrl,
    author_id: authorId,
    date: new Date().toISOString(),
    read_time: post.readTime || Math.ceil(post.content.length / 1000),
    featured: post.featured || false,
    trending: post.trending || false,
    popular: post.popular || false,
    status: post.status || 'draft',
    scheduled_date: post.scheduledDate ? post.scheduledDate.toISOString() : null
  };
};

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    console.log('Fetching all posts');
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      toast.error("Failed to load posts");
      return [];
    }

    console.log(`Found ${data?.length || 0} posts`);
    
    const posts = await Promise.all(
      (data as DatabasePost[]).map(async (dbPost) => await transformPost(dbPost))
    );

    return posts;
  } catch (error) {
    console.error("Error in fetchPosts:", error);
    toast.error("An unexpected error occurred");
    return [];
  }
};

export const fetchPostById = async (id: string): Promise<Post | null> => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Error fetching post:", error);
      toast.error("Failed to load post");
      return null;
    }

    return await transformPost(data as DatabasePost);
  } catch (error) {
    console.error("Error in fetchPostById:", error);
    toast.error("An unexpected error occurred");
    return null;
  }
};

export const createPost = async (post: Omit<Post, 'id'>, authorId: string): Promise<Post | null> => {
  try {
    await ensureAuthorProfile(authorId, post.author.name);
    
    const dbPost = transformToDbPost({
      ...post,
      id: 'temp-id'
    }, authorId);

    const { data, error } = await supabase
      .from('posts')
      .insert(dbPost)
      .select()
      .single();

    if (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
      return null;
    }

    console.log("Post created successfully:", data);
    toast.success("Post created successfully");
    return await transformPost(data as DatabasePost);
  } catch (error) {
    console.error("Error in createPost:", error);
    toast.error("An unexpected error occurred");
    return null;
  }
};

export const updatePost = async (id: string, post: Partial<Post>, authorId: string): Promise<Post | null> => {
  try {
    if (post.author?.name) {
      await ensureAuthorProfile(authorId, post.author.name);
    }
    
    const updateData: Partial<DatabasePost> = {};
    
    if (post.title !== undefined) updateData.title = post.title;
    if (post.excerpt !== undefined) updateData.excerpt = post.excerpt;
    if (post.content !== undefined) updateData.content = post.content;
    if (post.category !== undefined) updateData.category = post.category;
    if (post.imageUrl !== undefined) updateData.image_url = post.imageUrl;
    if (post.readTime !== undefined) updateData.read_time = post.readTime;
    if (post.featured !== undefined) updateData.featured = post.featured;
    if (post.trending !== undefined) updateData.trending = post.trending;
    if (post.popular !== undefined) updateData.popular = post.popular;
    if (post.status !== undefined) updateData.status = post.status;
    if (post.scheduledDate !== undefined) {
      updateData.scheduled_date = post.scheduledDate ? post.scheduledDate.toISOString() : null;
    }

    const { data, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
      return null;
    }

    toast.success("Post updated successfully");
    return await transformPost(data as DatabasePost);
  } catch (error) {
    console.error("Error in updatePost:", error);
    toast.error("An unexpected error occurred");
    return null;
  }
};

export const deletePost = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
      return false;
    }

    toast.success("Post deleted successfully");
    return true;
  } catch (error) {
    console.error("Error in deletePost:", error);
    toast.error("An unexpected error occurred");
    return false;
  }
};

export const ensureAuthorProfile = async (authorId: string, authorName: string): Promise<void> => {
  try {
    const { data: existingProfile, error: checkError } = await supabase
      .from('author_profiles')
      .select('id')
      .eq('id', authorId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error("Error checking author profile:", checkError);
      return;
    }

    if (!existingProfile) {
      const { error: insertError } = await supabase
        .from('author_profiles')
        .insert({
          id: authorId,
          name: authorName,
          avatar: '/placeholder.svg',
          bio: '',
          role: 'Contributor'
        });

      if (insertError) {
        console.error("Error creating author profile:", insertError);
      }
    }
  } catch (error) {
    console.error("Error in ensureAuthorProfile:", error);
  }
};

export const fetchPostsByCategory = async (category: Category): Promise<Post[]> => {
  try {
    console.log(`Fetching posts for category: ${category}`);
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) {
      console.error(`Error fetching posts by category ${category}:`, error);
      return [];
    }

    console.log(`Found ${data?.length || 0} posts for category ${category}`);
    
    const posts = await Promise.all(
      (data as DatabasePost[]).map(async (dbPost) => await transformPost(dbPost))
    );

    return posts;
  } catch (error) {
    console.error(`Error in fetchPostsByCategory for ${category}:`, error);
    return [];
  }
};

export const fetchFeaturedPosts = async (): Promise<Post[]> => {
  try {
    console.log("Fetching featured posts");
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching featured posts:", error);
      return [];
    }

    console.log(`Found ${data?.length || 0} featured posts`);
    
    const posts = await Promise.all(
      (data as DatabasePost[]).map(async (dbPost) => await transformPost(dbPost))
    );

    return posts;
  } catch (error) {
    console.error("Error in fetchFeaturedPosts:", error);
    return [];
  }
};

export const fetchPopularPosts = async (): Promise<Post[]> => {
  try {
    console.log("Fetching popular posts");
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('popular', true)
      .eq('status', 'published')
      .order('date', { ascending: false });

    if (error) {
      console.error("Error fetching popular posts:", error);
      return [];
    }

    console.log(`Found ${data?.length || 0} popular posts`);
    
    const posts = await Promise.all(
      (data as DatabasePost[]).map(async (dbPost) => await transformPost(dbPost))
    );

    return posts;
  } catch (error) {
    console.error("Error in fetchPopularPosts:", error);
    return [];
  }
};
