
import React, { useState } from 'react';
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
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash, Eye } from 'lucide-react';
import { mockPosts } from '@/utils/mockData';
import RichTextEditor from '@/components/editor/RichTextEditor';
import MarkdownRenderer from '@/components/editor/MarkdownRenderer';
import { toast } from 'sonner';

const AdminPosts: React.FC = () => {
  const { toast: uiToast } = useToast();
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSavePost = (postData: any) => {
    setIsSaving(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (selectedPost) {
        // Update existing post
        setPosts(posts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, ...postData, date: new Date().toISOString() } 
            : post
        ));
        toast.success("Post updated successfully");
      } else {
        // Create new post
        const newPost = {
          id: String(Date.now()),
          ...postData,
          author: {
            name: "Admin User",
            avatar: "/placeholder.svg"
          },
          date: new Date().toISOString(),
          readTime: Math.ceil(postData.content.length / 1000),
        };
        setPosts([newPost, ...posts]);
        toast.success("Post created successfully");
      }
      
      setIsSaving(false);
      setIsOpen(false);
    }, 1000);
  };

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast.success("Post deleted successfully");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setSelectedPost(null);
              setPreviewMode(false);
            }}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {previewMode 
                  ? (selectedPost ? `Preview: ${selectedPost.title}` : 'Preview Post')
                  : (selectedPost ? 'Edit Post' : 'Create New Post')
                }
              </DialogTitle>
            </DialogHeader>
            
            {previewMode ? (
              <div className="py-4">
                <div className="mb-4 flex justify-between">
                  <h1 className="text-2xl font-bold">{selectedPost?.title || 'Post Title'}</h1>
                  <Button variant="outline" onClick={() => setPreviewMode(false)}>
                    Back to Editor
                  </Button>
                </div>
                <MarkdownRenderer 
                  content={selectedPost?.content || ''} 
                  className="mt-4"
                />
              </div>
            ) : (
              <div className="py-4">
                <RichTextEditor
                  initialContent={selectedPost?.content || ''}
                  onSave={handleSavePost}
                  isSaving={isSaving}
                />
                {selectedPost && (
                  <div className="flex justify-center mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setPreviewMode(true)}
                    >
                      Preview Post
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>Manage and edit your content here</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Published
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setSelectedPost(post);
                        setPreviewMode(false);
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setSelectedPost(post);
                        setPreviewMode(true);
                        setIsOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button variant="outline">Next</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminPosts;
