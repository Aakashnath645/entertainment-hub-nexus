
import React, { useState } from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import RichTextEditor from '@/components/editor/RichTextEditor';
import MarkdownRenderer from '@/components/editor/MarkdownRenderer';
import { Post } from '@/services/postService';

interface PostEditorProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPost: Post | null;
  previewMode: boolean;
  setPreviewMode: (preview: boolean) => void;
  isSaving: boolean;
  onSavePost: (postData: any) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({
  isOpen,
  onOpenChange,
  selectedPost,
  previewMode,
  setPreviewMode,
  isSaving,
  onSavePost
}) => {
  const [previewContent, setPreviewContent] = useState<{
    title: string;
    content: string;
    authorName: string;
  }>({
    title: selectedPost?.title || '',
    content: selectedPost?.content || '',
    authorName: selectedPost?.author?.name || ''
  });

  // Update preview content when selected post changes
  React.useEffect(() => {
    if (selectedPost) {
      setPreviewContent({
        title: selectedPost.title,
        content: selectedPost.content,
        authorName: selectedPost.author?.name || ''
      });
    }
  }, [selectedPost]);

  const handleContentUpdate = (data: any) => {
    setPreviewContent({
      title: data.title || previewContent.title,
      content: data.content || previewContent.content,
      authorName: data.authorName || previewContent.authorName
    });
  };

  return (
    <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {previewMode 
            ? (selectedPost ? `Preview: ${previewContent.title}` : 'Preview Post')
            : (selectedPost ? 'Edit Post' : 'Create New Post')
          }
        </DialogTitle>
      </DialogHeader>
      
      {previewMode ? (
        <div className="py-4">
          <div className="mb-4 flex justify-between">
            <h1 className="text-2xl font-bold">{previewContent.title || 'Post Title'}</h1>
            <Button variant="outline" onClick={() => setPreviewMode(false)}>
              Back to Editor
            </Button>
          </div>
          <div className="text-sm text-muted-foreground mb-4">
            By {previewContent.authorName || 'Unknown Author'}
          </div>
          <MarkdownRenderer 
            content={previewContent.content || ''} 
            className="mt-4"
          />
        </div>
      ) : (
        <div className="py-4">
          <RichTextEditor
            initialContent={selectedPost?.content || ''}
            initialTitle={selectedPost?.title || ''}
            initialExcerpt={selectedPost?.excerpt || ''}
            initialAuthorName={selectedPost?.author?.name || ''}
            onSave={onSavePost}
            isSaving={isSaving}
            onContentUpdate={handleContentUpdate}
          />
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline" 
              onClick={() => setPreviewMode(true)}
            >
              Preview Post
            </Button>
          </div>
        </div>
      )}
    </DialogContent>
  );
};

export default PostEditor;
