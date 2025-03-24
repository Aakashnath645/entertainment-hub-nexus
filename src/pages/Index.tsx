
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import PopularPosts from '@/components/home/PopularPosts';
import TrendingTopics from '@/components/home/TrendingTopics';
import { 
  getPostsByCategory, 
  getPopularPosts,
  posts
} from '@/utils/mockData';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

const Index: React.FC = () => {
  // Animation for elements when they enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => observer.observe(element));

    return () => {
      elements.forEach(element => observer.unobserve(element));
    };
  }, []);

  // Get posts by category
  const moviePosts = getPostsByCategory('movie');
  const gamePosts = getPostsByCategory('game');
  const techPosts = getPostsByCategory('tech');
  const popularPosts = getPopularPosts();
  
  // Check if there are any posts
  const hasContent = posts.length > 0;

  return (
    <>
      <Navbar />
      <main>
        {/* Hero section */}
        <HeroSection />
        
        {/* Main content */}
        <div className="container mx-auto px-6 py-10">
          {hasContent ? (
            // Regular content when posts exist
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main content area - 3/4 width on large screens */}
              <div className="lg:col-span-3">
                {/* Movies section */}
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Movies & TV" 
                    category="movie" 
                    posts={moviePosts} 
                  />
                </div>
                
                {/* Games section */}
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Gaming" 
                    category="game" 
                    posts={gamePosts} 
                  />
                </div>
                
                {/* Tech section */}
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Technology" 
                    category="tech" 
                    posts={techPosts} 
                  />
                </div>
              </div>
              
              {/* Sidebar - 1/4 width on large screens */}
              <div className="lg:col-span-1 space-y-8">
                <div className="animate-on-scroll">
                  <PopularPosts posts={popularPosts} />
                </div>
                <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                  <TrendingTopics />
                </div>
                
                {/* Newsletter signup */}
                <div className="animate-on-scroll" style={{ animationDelay: '0.3s' }}>
                  <div className="bg-card border border-border/50 rounded-xl p-6">
                    <h3 className="font-semibold mb-3">Subscribe to Newsletter</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Get the latest news and updates delivered to your inbox.
                    </p>
                    <form>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-4 py-2 mb-3 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Empty state when no posts exist
            <div className="py-16">
              <div className="max-w-3xl mx-auto">
                <Card className="border-dashed animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-center">Welcome to Your Entertainment Blog</CardTitle>
                    <CardDescription className="text-center">
                      It looks like there aren't any articles posted yet. Start creating content to see it appear here.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <CategoryEmptyCard 
                        title="Movies & TV" 
                        category="movie"
                        description="Share the latest film and TV show reviews" 
                      />
                      <CategoryEmptyCard 
                        title="Gaming" 
                        category="game"
                        description="Write about gaming news and reviews" 
                      />
                      <CategoryEmptyCard 
                        title="Technology" 
                        category="tech"
                        description="Cover the latest tech innovations" 
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Link
                      to="/admin/posts"
                      className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                      <PlusCircle className="h-5 w-5" />
                      Create Your First Article
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

// Component for empty category cards
const CategoryEmptyCard: React.FC<{
  title: string;
  category: string;
  description: string;
}> = ({ title, category, description }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'movie':
        return 'border-entertainment-movie text-entertainment-movie';
      case 'game':
        return 'border-entertainment-game text-entertainment-game';
      case 'tech':
        return 'border-entertainment-tech text-entertainment-tech';
      default:
        return 'border-primary text-primary';
    }
  };

  return (
    <div className="p-6 bg-card/50 rounded-xl border border-dashed hover:bg-card transition-colors">
      <h3 className={`text-lg font-semibold mb-2 ${getCategoryColor(category)}`}>
        {title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {description}
      </p>
      <Link
        to={`/admin/posts?category=${category}`}
        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
      >
        <PlusCircle className="h-4 w-4" />
        Add {title} Article
      </Link>
    </div>
  );
};

export default Index;
