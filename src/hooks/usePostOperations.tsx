
import { useState } from 'react';
import { Post, createPost, updatePost, deletePost } from '@/services/postService';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';

export const usePostOperations = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const queryClient = useQueryClient();

  const handleSavePost = async (postData: any) => {
    setIsSaving(true);
    
    try {
      if (selectedPost) {
        // Update existing post
        const updatedPost = await updatePost(selectedPost.id, {
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          author: {
            ...selectedPost.author,
            name: postData.authorName || selectedPost.author.name
          }
        }, selectedPost.author.id);
        
        if (updatedPost) {
          toast.success("Post updated successfully");
          // Invalidate the posts query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
        }
      } else {
        // Create new post
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast.error("You must be logged in to create posts");
          setIsSaving(false);
          return;
        }

        const userId = user.id;
        
        if (!userId) {
          toast.error("Failed to get user ID");
          setIsSaving(false);
          return;
        }

        const newPost = await createPost({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          category: 'tech', // Default category
          imageUrl: 'https://source.unsplash.com/random/800x600/?technology',
          author: {
            id: userId,
            name: postData.authorName || 'Anonymous',
            avatar: "/placeholder.svg",
            bio: '',
            role: 'Contributor'
          },
          date: new Date().toISOString(),
          readTime: Math.ceil(postData.content.length / 1000),
          status: 'draft',
        }, userId);
        
        if (newPost) {
          toast.success("Post created successfully");
          // Invalidate the posts query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
        }
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post");
    } finally {
      setIsSaving(false);
      setIsOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const success = await deletePost(id);
      if (success) {
        toast.success("Post deleted successfully");
        // Invalidate the posts query to trigger a refetch
        queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handlePublish = async (post: Post) => {
    try {
      const updatedPost = await updatePost(post.id, {
        status: 'published',
        date: new Date().toISOString(),
      }, post.author.id);
      
      if (updatedPost) {
        toast.success("Post published successfully");
        // Invalidate the posts query to trigger a refetch
        queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
      }
    } catch (error) {
      console.error("Error publishing post:", error);
      toast.error("Failed to publish post");
    }
  };

  const handleOpenCreatePost = () => {
    setSelectedPost(null);
    setPreviewMode(false);
    setIsOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setPreviewMode(false);
    setIsOpen(true);
  };

  const handlePreviewPost = (post: Post) => {
    setSelectedPost(post);
    setPreviewMode(true);
    setIsOpen(true);
  };

  return {
    selectedPost,
    setSelectedPost,
    isOpen,
    setIsOpen,
    previewMode,
    setPreviewMode,
    isSaving,
    setIsSaving,
    handleSavePost,
    handleDelete,
    handlePublish,
    handleOpenCreatePost,
    handleEditPost,
    handlePreviewPost
  };
};
