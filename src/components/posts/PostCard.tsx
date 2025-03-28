
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { Post } from '@/utils/mockData';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PostCardProps {
  post: Post;
  variant?: 'default' | 'horizontal' | 'featured' | 'minimal';
  className?: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  variant = 'default',
  className
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'movie':
        return 'text-entertainment-movie';
      case 'game':
        return 'text-entertainment-game';
      case 'tech':
        return 'text-entertainment-tech';
      case 'series':
        return 'text-purple-600';
      case 'comics':
        return 'text-yellow-600';
      default:
        return 'text-primary';
    }
  };
  
  // Generate formatted date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Featured variant - large card with overlay
  if (variant === 'featured') {
    return (
      <div 
        className={cn(
          "relative group overflow-hidden rounded-xl h-[500px]",
          className
        )}
      >
        <Link to={`/post/${post.id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View article: {post.title}</span>
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent z-[1]"></div>
        <img 
          src={post.imageUrl} 
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 p-6 z-[2]">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getCategoryColor(post.category)} bg-primary/10`}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">{post.title}</h2>
            <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
            <div className="flex items-center pt-2 gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={post.author.avatar} 
                    alt={post.author.name}
                  />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{post.author.name}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-xs">{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Horizontal variant - for sidebar or list view
  if (variant === 'horizontal') {
    return (
      <div className={cn("flex gap-4 group", className)}>
        <Link 
          to={`/post/${post.id}`}
          className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden"
        >
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={`/post/${post.id}`}>
            <span className={`text-xs font-medium ${getCategoryColor(post.category)}`}>
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </span>
            <h3 className="font-medium line-clamp-2 group-hover:text-primary/80 transition-colors">
              {post.title}
            </h3>
          </Link>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    );
  }
  
  // Minimal variant - just title and category
  if (variant === 'minimal') {
    return (
      <div className={cn("group", className)}>
        <Link to={`/post/${post.id}`} className="block">
          <span className={`text-xs font-medium ${getCategoryColor(post.category)}`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <h3 className="font-medium line-clamp-2 group-hover:text-primary/80 transition-colors">
            {post.title}
          </h3>
          <div className="mt-1 flex items-center text-xs text-muted-foreground">
            <span>{formattedDate}</span>
          </div>
        </Link>
      </div>
    );
  }
  
  // Default variant - standard card
  return (
    <div 
      className={cn(
        "group overflow-hidden rounded-xl flex flex-col h-full bg-card border border-border/50",
        className
      )}
    >
      <Link to={`/post/${post.id}`} className="overflow-hidden">
        <div className="overflow-hidden h-48">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex flex-col p-5 flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getCategoryColor(post.category)} bg-primary/10`}>
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <span className="text-xs text-muted-foreground">{formattedDate}</span>
        </div>
        <Link to={`/post/${post.id}`} className="mb-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary/80 transition-colors">
            {post.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center mt-auto gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage 
                src={post.author.avatar} 
                alt={post.author.name}
              />
              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">{post.author.name}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span className="text-xs">{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
