import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import PopularPosts from '@/components/home/PopularPosts';
import TrendingTopics from '@/components/home/TrendingTopics';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPostsByCategory, fetchFeaturedPosts, fetchPopularPosts } from '@/services/postService';
import { toast } from 'sonner';

const Index: React.FC = () => {
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

  const { data: allPosts = [], isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: moviePosts = [], isLoading: movieLoading, error: movieError } = useQuery({
    queryKey: ['posts', 'movie'],
    queryFn: () => fetchPostsByCategory('movie'),
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: gamePosts = [], isLoading: gameLoading, error: gameError } = useQuery({
    queryKey: ['posts', 'game'],
    queryFn: () => fetchPostsByCategory('game'),
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: techPosts = [], isLoading: techLoading, error: techError } = useQuery({
    queryKey: ['posts', 'tech'],
    queryFn: () => fetchPostsByCategory('tech'),
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: featuredPosts = [], isLoading: featuredLoading, error: featuredError } = useQuery({
    queryKey: ['posts', 'featured'],
    queryFn: fetchFeaturedPosts,
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: popularPosts = [], isLoading: popularLoading, error: popularError } = useQuery({
    queryKey: ['posts', 'popular'],
    queryFn: fetchPopularPosts,
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: seriesPosts = [], isLoading: seriesLoading, error: seriesError } = useQuery({
    queryKey: ['posts', 'series'],
    queryFn: () => fetchPostsByCategory('series'),
    staleTime: 5000,
    refetchInterval: 10000,
  });

  const { data: comicsPosts = [], isLoading: comicsLoading, error: comicsError } = useQuery({
    queryKey: ['posts', 'comics'],
    queryFn: () => fetchPostsByCategory('comics'),
    staleTime: 5000,
    refetchInterval: 10000,
  });

  useEffect(() => {
    console.log('All Posts:', allPosts.length);
    console.log('Movie Posts:', moviePosts.length);
    console.log('Game Posts:', gamePosts.length);
    console.log('Tech Posts:', techPosts.length);
    console.log('Featured Posts:', featuredPosts.length);
    console.log('Popular Posts:', popularPosts.length);
    console.log('Series Posts:', seriesPosts.length);
    console.log('Comics Posts:', comicsPosts.length);
    
    const publishedPosts = allPosts.filter(post => post.status === 'published');
    console.log('Published Posts:', publishedPosts.length);
    
    const publishedMoviePosts = moviePosts.filter(post => post.status === 'published');
    const publishedGamePosts = gamePosts.filter(post => post.status === 'published');
    const publishedTechPosts = techPosts.filter(post => post.status === 'published');
    const publishedSeriesPosts = seriesPosts.filter(post => post.status === 'published');
    const publishedComicsPosts = comicsPosts.filter(post => post.status === 'published');
    
    console.log('Published Movie Posts:', publishedMoviePosts.length);
    console.log('Published Game Posts:', publishedGamePosts.length);
    console.log('Published Tech Posts:', publishedTechPosts.length);
    console.log('Published Series Posts:', publishedSeriesPosts.length);
    console.log('Published Comics Posts:', publishedComicsPosts.length);

    if (postsError) console.error('Error fetching all posts:', postsError);
    if (movieError) console.error('Error fetching movie posts:', movieError);
    if (gameError) console.error('Error fetching game posts:', gameError);
    if (techError) console.error('Error fetching tech posts:', techError);
    if (featuredError) console.error('Error fetching featured posts:', featuredError);
    if (popularError) console.error('Error fetching popular posts:', popularError);
    if (seriesError) console.error('Error fetching series posts:', seriesError);
    if (comicsError) console.error('Error fetching comics posts:', comicsError);

    if (postsError || movieError || gameError || techError || featuredError || popularError || 
        seriesError || comicsError) {
      toast.error("There was an error loading content. Please try refreshing the page.");
    }
  }, [allPosts, moviePosts, gamePosts, techPosts, featuredPosts, popularPosts, seriesPosts, comicsPosts,
      postsError, movieError, gameError, techError, featuredError, popularError, seriesError, comicsError]);

  const publishedPosts = allPosts.filter(post => post.status === 'published');
  const hasContent = publishedPosts.length > 0;

  return (
    <>
      <Navbar />
      <main>
        <HeroSection featuredPosts={featuredPosts} loading={featuredLoading || postsLoading} />
        
        <div className="container mx-auto px-6 py-10">
          {hasContent ? (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Movies & TV" 
                    category="movie" 
                    posts={moviePosts} 
                  />
                </div>
                
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="TV Series" 
                    category="series" 
                    posts={seriesPosts} 
                  />
                </div>
                
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Comics & Manga" 
                    category="comics" 
                    posts={comicsPosts} 
                  />
                </div>
                
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Gaming" 
                    category="game" 
                    posts={gamePosts} 
                  />
                </div>
                
                <div className="animate-on-scroll">
                  <CategorySection 
                    title="Technology" 
                    category="tech" 
                    posts={techPosts} 
                  />
                </div>
              </div>
              
              <div className="lg:col-span-1 space-y-8">
                <div className="animate-on-scroll">
                  <PopularPosts posts={popularPosts} />
                </div>
                <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                  <TrendingTopics />
                </div>
                
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
            <div className="py-16">
              <div className="max-w-3xl mx-auto">
                <Card className="border-dashed animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-center">Welcome to Your Entertainment Blog</CardTitle>
                    <CardDescription className="text-center">
                      It looks like there aren't any published articles yet. Start creating content to see it appear here.
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
                        title="TV Series" 
                        category="series"
                        description="Review and discuss popular TV series" 
                      />
                      <CategoryEmptyCard 
                        title="Comics & Manga" 
                        category="comics"
                        description="Cover comics, graphic novels and manga" 
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
      case 'series':
        return 'border-entertainment-series text-entertainment-series';
      case 'comics':
        return 'border-entertainment-comics text-entertainment-comics';
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
