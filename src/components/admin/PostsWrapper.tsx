
import React from 'react';
import { Post, updatePost } from '@/services/postService';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import AdminPosts from '@/pages/Admin/Posts';

const PostsWrapper: React.FC = () => {
  const queryClient = useQueryClient();

  const handleToggleFeature = async (post: Post) => {
    try {
      const updatedFeatured = !post.featured;
      const result = await updatePost(
        post.id, 
        { featured: updatedFeatured },
        post.author.id
      );
      
      if (result) {
        toast.success(
          updatedFeatured 
            ? "Post added to featured content" 
            : "Post removed from featured content"
        );
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['posts', 'featured'] });
      }
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  return <AdminPosts onToggleFeature={handleToggleFeature} />;
};

export default PostsWrapper;
