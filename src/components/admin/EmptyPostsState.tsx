
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyPostsStateProps {
  onCreatePost: () => void;
}

const EmptyPostsState: React.FC<EmptyPostsStateProps> = ({ onCreatePost }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-muted-foreground mb-4">No posts available yet</p>
      <Button onClick={onCreatePost}>
        <Plus className="mr-2 h-4 w-4" /> Create Your First Post
      </Button>
    </div>
  );
};

export default EmptyPostsState;
