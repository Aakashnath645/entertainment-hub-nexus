
import React from 'react';
import { Post } from '@/utils/mockData';
import PostCard from './PostCard';
import { cn } from '@/lib/utils';

interface PostGridProps {
  posts: Post[];
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const PostGrid: React.FC<PostGridProps> = ({ 
  posts, 
  className,
  columns = 3
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <div className={cn(
      `grid ${getGridCols()} gap-6`,
      className
    )}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
