
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  author_email?: string;
  author_image?: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface NewComment {
  post_id: string;
  author_name: string;
  author_email?: string;
  author_image?: string;
  content: string;
}

// Fetch comments for a post
export const fetchComments = async (postId: string): Promise<Comment[]> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
      return [];
    }

    return data as Comment[];
  } catch (error) {
    console.error("Error in fetchComments:", error);
    toast.error("An unexpected error occurred");
    return [];
  }
};

// Add a comment to a post
export const addComment = async (comment: NewComment): Promise<Comment | null> => {
  try {
    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .select()
      .single();

    if (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
      return null;
    }

    toast.success("Comment added successfully");
    return data as Comment;
  } catch (error) {
    console.error("Error in addComment:", error);
    toast.error("An unexpected error occurred");
    return null;
  }
};
