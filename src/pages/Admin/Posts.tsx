
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import PostsTable from '@/components/admin/PostsTable';
import EmptyPostsState from '@/components/admin/EmptyPostsState';
import { Post } from '@/services/postService';
import { useAuth } from '@/context/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/services/postService';
import { usePostsRealtime } from '@/hooks/usePostsRealtime';
import { usePostOperations } from '@/hooks/usePostOperations';
import PostActions from '@/components/admin/PostActions';

interface AdminPostsProps {
  onToggleFeature?: (post: Post) => void;
}

const AdminPosts: React.FC<AdminPostsProps> = ({ onToggleFeature }) => {
  const { adminEmail } = useAuth();
  const { 
    selectedPost,
    isOpen,
    setIsOpen,
    previewMode,
    setPreviewMode,
    isSaving,
    handleSavePost,
    handleDelete,
    handlePublish,
    handleOpenCreatePost,
    handleEditPost,
    handlePreviewPost
  } = usePostOperations();
  
  // Set up real-time subscription
  usePostsRealtime();

  // Use React Query for data fetching
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['admin-posts'],
    queryFn: fetchPosts,
    staleTime: 1000, // 1 second
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Default toggle feature handler if none is provided from parent
  const defaultToggleFeature = async (post: Post) => {
    toast.error("Feature toggling not available");
    console.warn("onToggleFeature prop was not provided to AdminPosts component");
  };

  return (
    <div>
      <PostActions
        selectedPost={selectedPost}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        previewMode={previewMode}
        setPreviewMode={setPreviewMode}
        isSaving={isSaving}
        onSavePost={handleSavePost}
        onOpenCreatePost={handleOpenCreatePost}
      />

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
              onToggleFeature={onToggleFeature || defaultToggleFeature}
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
