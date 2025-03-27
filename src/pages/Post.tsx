
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  ArrowLeft,
  Globe,
  Mail,
  Eye
} from 'lucide-react';
import { Post as PostType } from '@/utils/mockData';
import PostCard from '@/components/posts/PostCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MarkdownRenderer from '@/components/editor/MarkdownRenderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { fetchPostById, fetchPostsByCategory } from '@/services/postService';
import { recordPostView, getPostViewCount } from '@/services/viewService';
import { fetchComments, Comment } from '@/services/commentService';
import CommentForm from '@/components/posts/CommentForm';
import CommentList from '@/components/posts/CommentList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);
  const queryClient = useQueryClient();
  
  // Fetch post data with React Query
  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(id || ''),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fetch view count with React Query
  const { data: viewCount = 0, isLoading: viewsLoading } = useQuery({
    queryKey: ['post-views', id],
    queryFn: () => getPostViewCount(id || ''),
    enabled: !!id,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
  });

  // Fetch comments with React Query
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ['post-comments', id],
    queryFn: () => fetchComments(id || ''),
    enabled: !!id,
    staleTime: 1000, // 1 second
  });

  // Record a view when the post is loaded
  useEffect(() => {
    if (id) {
      recordPostView(id);
    }
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [id]);

  // Set up real-time subscription for views updates
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel('post-view-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'post_views',
          filter: `post_id=eq.${id}`
        },
        (payload) => {
          console.log('Real-time view update:', payload);
          // Invalidate the views query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['post-views', id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  // Set up real-time subscription for comments updates
  useEffect(() => {
    if (!id) return;

    const channel = supabase
      .channel('post-comment-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${id}`
        },
        (payload) => {
          console.log('Real-time comment update:', payload);
          // Invalidate the comments query to trigger a refetch
          queryClient.invalidateQueries({ queryKey: ['post-comments', id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, queryClient]);

  // Fetch related posts when post data is available
  useEffect(() => {
    if (post) {
      const fetchRelated = async () => {
        const relatedData = await fetchPostsByCategory(post.category);
        const filtered = relatedData.filter(p => p.id !== id).slice(0, 3);
        setRelatedPosts(filtered);
      };
      
      fetchRelated();
    }
  }, [post, id]);
  
  if (postLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <Link to="/" className="text-primary underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  // Category styling
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'movie':
        return 'text-entertainment-movie';
      case 'game':
        return 'text-entertainment-game';
      case 'tech':
        return 'text-entertainment-tech';
      default:
        return 'text-primary';
    }
  };

  // Handle comment added
  const handleCommentAdded = () => {
    queryClient.invalidateQueries({ queryKey: ['post-comments', id] });
  };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        {/* Hero section */}
        <div className="w-full h-[50vh] min-h-[400px] relative overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6">
          {/* Back button */}
          <div className="mt-8 mb-6">
            <Link 
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          {/* Article header */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="mb-6">
              <Link 
                to={`/category/${post.category}`}
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)} bg-primary/10 mb-4`}
              >
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </Link>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage 
                      src={post.author.avatar} 
                      alt={post.author.name}
                    />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="font-medium block">{post.author.name}</span>
                    <span className="text-xs text-muted-foreground">{post.author.role}</span>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Eye className="h-4 w-4 mr-2" />
                  <span>{viewCount} {viewCount === 1 ? 'view' : 'views'}</span>
                </div>
              </div>
            </div>
            
            {/* Social sharing */}
            <div className="flex items-center gap-4 pb-6 border-b border-border">
              <span className="text-sm text-muted-foreground">Share:</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Share on Facebook">
                  <Facebook className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Share on Twitter">
                  <Twitter className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Article content */}
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-a:text-primary prose-headings:font-bold prose-img:rounded-xl mb-16">
            <MarkdownRenderer content={post.content} />
          </div>
          
          {/* Author bio - enhanced section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="p-8 bg-card border border-border rounded-xl">
              <h3 className="text-xl font-bold mb-6 border-b pb-4">About the Author</h3>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0 flex flex-col items-center">
                  <Avatar className="w-32 h-32">
                    <AvatarImage 
                      src={post.author.avatar} 
                      alt={post.author.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-3xl">{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  {post.author.social && (
                    <div className="flex gap-2 mt-4">
                      {post.author.social.twitter && (
                        <a href={post.author.social.twitter} target="_blank" rel="noopener noreferrer" 
                           className="p-2 rounded-full hover:bg-secondary transition-colors">
                          <Twitter className="h-4 w-4" />
                        </a>
                      )}
                      {post.author.social.linkedin && (
                        <a href={post.author.social.linkedin} target="_blank" rel="noopener noreferrer"
                           className="p-2 rounded-full hover:bg-secondary transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      )}
                      {post.author.social.website && (
                        <a href={post.author.social.website} target="_blank" rel="noopener noreferrer"
                           className="p-2 rounded-full hover:bg-secondary transition-colors">
                          <Globe className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold">{post.author.name}</h4>
                    <p className="text-muted-foreground text-sm">{post.author.role}</p>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {post.author.bio}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm">
                      View All Articles
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="h-5 w-5" />
              <h3 className="text-xl font-bold">Comments ({comments.length})</h3>
            </div>
            
            {/* Comment form */}
            <CommentForm postId={id || ''} onCommentAdded={handleCommentAdded} />
            
            {/* Comments list */}
            {commentsLoading ? (
              <div className="flex justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <CommentList comments={comments} />
            )}
          </div>
          
          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
          
          {/* Newsletter signup */}
          <div className="max-w-4xl mx-auto">
            <div className="p-8 md:p-12 bg-card border border-border rounded-xl text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Subscribe to our newsletter to get the latest news, reviews, and insights in entertainment.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 bg-background border border-border rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Post;
