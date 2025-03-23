
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import PopularPosts from '@/components/home/PopularPosts';
import TrendingTopics from '@/components/home/TrendingTopics';
import { 
  getPostsByCategory, 
  getPopularPosts
} from '@/utils/mockData';

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

  return (
    <>
      <Navbar />
      <main>
        {/* Hero section */}
        <HeroSection />
        
        {/* Main content */}
        <div className="container mx-auto px-6 py-10">
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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;
