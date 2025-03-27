
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Record a view for a post
export const recordPostView = async (postId: string): Promise<boolean> => {
  try {
    // Get client IP to avoid duplicate counts from the same viewer in a short time
    // In production, this would be the actual client IP
    // For development, we'll use a random ID
    const viewerId = crypto.randomUUID();
    
    const { error } = await supabase
      .from('post_views')
      .insert({
        post_id: postId,
        viewer_ip: viewerId
      });
    
    if (error) {
      console.error("Error recording view:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Error in recordPostView:", error);
    return false;
  }
};

// Get view count for a post
export const getPostViewCount = async (postId: string): Promise<number> => {
  try {
    const { data, error, count } = await supabase
      .from('post_views')
      .select('*', { count: 'exact' })
      .eq('post_id', postId);
    
    if (error) {
      console.error("Error getting view count:", error);
      return 0;
    }
    
    return count || 0;
  } catch (error) {
    console.error("Error in getPostViewCount:", error);
    return 0;
  }
};
