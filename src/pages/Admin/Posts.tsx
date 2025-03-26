
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import PostsTable from '@/components/admin/PostsTable';
import EmptyPostsState from '@/components/admin/EmptyPostsState';
import PostEditor from '@/components/admin/PostEditor';
import { fetchPosts, createPost, updatePost, deletePost, Post } from '@/services/postService';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const AdminPosts: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { adminEmail } = useAuth();
  const queryClient = useQueryClient();

  // Use React Query for data fetching with real-time capabilities
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: fetchPosts,
    staleTime: 1000, // 1 second
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Set up real-time subscription for posts changes
  useEffect(() => {
    const channel = supabase
      .channel('admin-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          console.log('Real-time update detected:', payload);
          // Invalidate the posts query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['admin-posts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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
        if (!adminEmail) {
          toast.error("You must be logged in to create posts");
          setIsSaving(false);
          return;
        }

        const userId = (await supabase.auth.getUser()).data.user?.id;
        
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

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenCreatePost}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </DialogTrigger>
          <PostEditor 
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            selectedPost={selectedPost}
            previewMode={previewMode}
            setPreviewMode={setPreviewMode}
            isSaving={isSaving}
            onSavePost={handleSavePost}
          />
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>Manage and edit your content here</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : posts.length === 0 ? (
            <EmptyPostsState onCreatePost={handleOpenCreatePost} />
          ) : (
            <PostsTable 
              posts={posts} 
              onEdit={handleEditPost} 
              onPreview={handlePreviewPost} 
              onDelete={handleDelete}
              onPublish={handlePublish}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" disabled={posts.length === 0}>Previous</Button>
          <Button variant="outline" disabled={posts.length === 0}>Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminPosts;
