
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { mockPosts, Post } from '@/utils/mockData';
import { toast } from 'sonner';
import PostsTable from '@/components/admin/PostsTable';
import EmptyPostsState from '@/components/admin/EmptyPostsState';
import PostEditor from '@/components/admin/PostEditor';

const AdminPosts: React.FC = () => {
  const { toast: uiToast } = useToast();
  const [posts, setPosts] = useState<Post[]>([...mockPosts]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPosts([...mockPosts]);
  }, [mockPosts]);

  const handleSavePost = (postData: any) => {
    setIsSaving(true);
    
    setTimeout(() => {
      if (selectedPost) {
        const updatedPosts = posts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, ...postData, date: new Date().toISOString() } 
            : post
        );
        setPosts(updatedPosts);
        mockPosts.length = 0;
        updatedPosts.forEach(post => mockPosts.push(post));
        toast.success("Post updated successfully");
      } else {
        const newPost = {
          id: String(Date.now()),
          ...postData,
          author: {
            name: "Admin User",
            avatar: "/placeholder.svg"
          },
          date: new Date().toISOString(),
          readTime: Math.ceil(postData.content.length / 1000),
          category: postData.category || 'Uncategorized',
        };
        const updatedPosts = [newPost, ...posts];
        setPosts(updatedPosts);
        mockPosts.length = 0;
        updatedPosts.forEach(post => mockPosts.push(post));
        toast.success("Post created successfully");
      }
      
      setIsSaving(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    mockPosts.length = 0;
    updatedPosts.forEach(post => mockPosts.push(post));
    toast.success("Post deleted successfully");
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
          {posts.length === 0 ? (
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
