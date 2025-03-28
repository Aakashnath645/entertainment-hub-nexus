
import React from 'react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash, Eye, Send, Star } from 'lucide-react';
import { Post } from '@/services/postService';
import { Badge } from '@/components/ui/badge';

interface PostsTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onPreview: (post: Post) => void;
  onDelete: (id: string) => void;
  onPublish: (post: Post) => void;
  onToggleFeature: (post: Post) => void; // New prop for toggling feature status
}

const PostsTable: React.FC<PostsTableProps> = ({ 
  posts, 
  onEdit, 
  onPreview, 
  onDelete,
  onPublish,
  onToggleFeature
}) => {
  // Function to get the appropriate status badge style
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Confirm before deleting
  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      onDelete(id);
    }
  };

  return (
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
            <TableCell className="font-medium">
              <div className="flex items-center gap-2">
                {post.featured && (
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                )}
                {post.title}
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline" className="capitalize">
                {post.category}
              </Badge>
            </TableCell>
            <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
            <TableCell>
              {getStatusBadge(post.status)}
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onToggleFeature(post)}
                title={post.featured ? "Remove from featured" : "Add to featured"}
                className={post.featured ? "text-amber-500" : ""}
              >
                <Star className={`h-4 w-4 ${post.featured ? "fill-amber-500" : ""}`} />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onEdit(post)}
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onPreview(post)}
                title="Preview"
              >
                <Eye className="h-4 w-4" />
              </Button>
              {post.status === 'draft' && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onPublish(post)}
                  title="Publish"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => handleDelete(post.id, post.title)}
                title="Delete"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PostsTable;
