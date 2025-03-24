
import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, PlusCircle } from 'lucide-react';
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
  const hasPosts = displayPosts.length > 0;

  return (
    <div className={cn("bg-card border border-border/50 rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-entertainment-movie" />
        <h3 className="font-semibold">Popular Posts</h3>
      </div>
      
      {hasPosts ? (
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
      ) : (
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-muted-foreground mb-4">
            No popular posts yet. As readers engage with your content, the most viewed articles will appear here.
          </p>
          <Link
            to="/admin/posts"
            className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg hover:bg-accent transition-colors text-sm"
          >
            <PlusCircle className="h-4 w-4" />
            Create Article
          </Link>
        </div>
      )}
      
      {hasPosts && (
        <div className="p-4 border-t border-border">
          <Link 
            to="/popular"
            className="text-sm font-medium text-muted-foreground hover:text-foreground block text-center"
          >
            View All Popular
          </Link>
        </div>
      )}
    </div>
  );
};

export default PopularPosts;
