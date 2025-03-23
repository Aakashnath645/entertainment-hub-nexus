
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';
import { Post } from '@/utils/mockData';
import PostCard from '../posts/PostCard';
import { cn } from '@/lib/utils';

interface PopularPostsProps {
  posts: Post[];
  className?: string;
}

const PopularPosts: React.FC<PopularPostsProps> = ({ posts, className }) => {
  // Only show up to 5 popular posts
  const displayPosts = posts.slice(0, 5);

  return (
    <div className={cn("bg-card border border-border/50 rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-entertainment-movie" />
        <h3 className="font-semibold">Popular Posts</h3>
      </div>
      
      <div className="divide-y divide-border">
        {displayPosts.map((post, index) => (
          <div key={post.id} className="p-4">
            <PostCard 
              post={post} 
              variant={index === 0 ? "horizontal" : "minimal"} 
            />
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-border">
        <Link 
          to="/popular"
          className="text-sm font-medium text-muted-foreground hover:text-foreground block text-center"
        >
          View All Popular
        </Link>
      </div>
    </div>
  );
};

export default PopularPosts;
