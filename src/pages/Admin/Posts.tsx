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

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { adminEmail } = useAuth();

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
      toast.error("Failed to load posts");
    } finally {
      setIsLoading(false);
    }
  };

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
          setPosts(prev => prev.map(post => 
            post.id === selectedPost.id ? updatedPost : post
          ));
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
          setPosts(prev => [newPost, ...prev]);
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
    const success = await deletePost(id);
    if (success) {
      setPosts(prev => prev.filter(post => post.id !== id));
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
