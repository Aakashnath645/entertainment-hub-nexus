
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  DialogDescription,
  DialogFooter,
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
import { Plus, Edit, Trash } from 'lucide-react';
import { mockPosts } from '@/utils/mockData';

const AdminPosts: React.FC = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState(mockPosts);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSavePost = () => {
    // In a real app, this would save to the database
    toast({
      title: "Success",
      description: "Post has been saved successfully",
    });
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would delete from the database
    setPosts(posts.filter(post => post.id !== id));
    toast({
      title: "Success",
      description: "Post has been deleted successfully",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Posts</h1>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setSelectedPost(null)}>
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>{selectedPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
              <DialogDescription>
                {selectedPost 
                  ? 'Make changes to your post here.' 
                  : 'Fill in the details to create a new post.'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="title">Title</label>
                <Input 
                  id="title" 
                  placeholder="Enter post title" 
                  defaultValue={selectedPost?.title || ''}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="excerpt">Excerpt</label>
                <Input 
                  id="excerpt" 
                  placeholder="Brief summary" 
                  defaultValue={selectedPost?.excerpt || ''}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="content">Content</label>
                <Textarea 
                  id="content" 
                  placeholder="Write your post content here..." 
                  rows={8}
                  defaultValue={selectedPost?.content || ''}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label htmlFor="category">Category</label>
                  <Input 
                    id="category" 
                    placeholder="e.g., movie, game, tech" 
                    defaultValue={selectedPost?.category || ''}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="imageUrl">Image URL</label>
                  <Input 
                    id="imageUrl" 
                    placeholder="https://example.com/image.jpg" 
                    defaultValue={selectedPost?.imageUrl || ''}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="featured" 
                    defaultChecked={selectedPost?.featured || false}
                  />
                  <label htmlFor="featured">Featured</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="trending" 
                    defaultChecked={selectedPost?.trending || false}
                  />
                  <label htmlFor="trending">Trending</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="popular" 
                    defaultChecked={selectedPost?.popular || false}
                  />
                  <label htmlFor="popular">Popular</label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button onClick={handleSavePost}>Save</Button>
            </DialogFooter>
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
                        setIsOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
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
