
import React from 'react';
import { Button } from '@/components/ui/button';
import { Post } from '@/services/postService';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import PostEditor from '@/components/admin/PostEditor';

interface PostActionsProps {
  selectedPost: Post | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  previewMode: boolean;
  setPreviewMode: (mode: boolean) => void;
  isSaving: boolean;
  onSavePost: (postData: any) => void;
  onOpenCreatePost: () => void;
}

const PostActions: React.FC<PostActionsProps> = ({
  selectedPost,
  isOpen,
  setIsOpen,
  previewMode,
  setPreviewMode,
  isSaving,
  onSavePost,
  onOpenCreatePost
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Manage Posts</h1>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button onClick={onOpenCreatePost}>
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
          onSavePost={onSavePost}
        />
      </Dialog>
    </div>
  );
};

export default PostActions;
