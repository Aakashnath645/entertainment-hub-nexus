
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Post } from '@/services/postService';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface HeroSectionProps {
  featuredPosts?: Post[];
  loading?: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredPosts = [], loading = false }) => {
  // Take the first featured post for the main hero
  const featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : null;
  
  // Take the next 2 featured posts for secondary spots
  const secondaryPosts = featuredPosts.slice(1, 3);
  
  return (
    <section className="relative bg-background pt-20">
      <div className="container mx-auto px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Hero - 3/4 width on large screens */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="w-full h-[500px] rounded-xl overflow-hidden relative">
                <Skeleton className="w-full h-full" />
              </div>
            ) : featuredPost ? (
              <Link to={`/post/${featuredPost.id}`} className="block">
                <div className="w-full h-[500px] rounded-xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent z-10" />
                  <img 
                    src={featuredPost.imageUrl} 
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <span className="px-3 py-1 text-xs font-medium text-white rounded-full bg-primary/70 backdrop-blur-sm mb-3 inline-block">
                      {featuredPost.category.charAt(0).toUpperCase() + featuredPost.category.slice(1)}
                    </span>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
                      {featuredPost.title}
                    </h1>
                    <p className="text-white/80 mb-4 max-w-3xl line-clamp-2 md:line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-white/70 text-sm">
                      <span className="mr-3">By {featuredPost.author.name}</span>
                      <span>•</span>
                      <span className="mx-3">{new Date(featuredPost.date).toLocaleDateString()}</span>
                      <span>•</span>
                      <span className="ml-3">{featuredPost.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="w-full h-[500px] rounded-xl overflow-hidden relative bg-card border border-dashed border-border flex items-center justify-center">
                <div className="text-center p-6">
                  <h2 className="text-2xl font-bold mb-3">Featured Content</h2>
                  <p className="text-muted-foreground mb-5">
                    Create featured content to showcase important articles here.
                  </p>
                  <Link to="/admin/posts">
                    <Button>
                      Create Featured Content
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          {/* Right sidebar - 1/4 width on large screens */}
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-bold">Recent Updates</h2>
              <Link to="/category/all" className="text-sm text-primary hover:underline flex items-center">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Secondary featured posts */}
            <div className="space-y-4">
              {loading ? (
                // Loading skeletons
                Array(2).fill(0).map((_, index) => (
                  <div key={index} className="flex flex-col space-y-2">
                    <Skeleton className="h-40 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))
              ) : secondaryPosts.length > 0 ? (
                secondaryPosts.map((post) => (
                  <Link key={post.id} to={`/post/${post.id}`} className="block">
                    <div className="rounded-lg overflow-hidden h-40 mb-3 relative group">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/70 backdrop-blur-sm text-white">
                        {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                      </div>
                    </div>
                    <h3 className="font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="text-xs text-muted-foreground mt-1">
                      {new Date(post.date).toLocaleDateString()} • {post.readTime} min read
                    </div>
                  </Link>
                ))
              ) : (
                // Placeholder when no secondary posts exist
                <div className="text-center p-4 border border-dashed border-border rounded-lg">
                  <p className="text-muted-foreground">
                    Create more featured content to see it here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
