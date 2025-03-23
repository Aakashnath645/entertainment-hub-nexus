
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Category as CategoryType, Post, getPostsByCategory } from '@/utils/mockData';
import PostGrid from '@/components/posts/PostGrid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const sortOptions = [
  { value: 'latest', label: 'Most Recent' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'trending', label: 'Trending' },
];

const Category: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  
  useEffect(() => {
    if (category) {
      // Get category posts
      const categoryPosts = getPostsByCategory(category as CategoryType);
      
      // Sort posts based on selected option
      const sortedPosts = [...categoryPosts].sort((a, b) => {
        if (sortBy === 'latest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        // For trending, just use a basic implementation
        return b.readTime - a.readTime;
      });
      
      setPosts(sortedPosts);
    }
    
    // Scroll to top when category changes
    window.scrollTo(0, 0);
  }, [category, sortBy]);
  
  const getCategoryTitle = (category: string | undefined) => {
    if (!category) return 'All Categories';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  const getCategoryColor = (category: string | undefined) => {
    if (!category) return '';
    
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
    <>
      <Navbar />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Category header */}
          <div className="py-10 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${getCategoryColor(category)}`}>
                {getCategoryTitle(category)}
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Discover the latest {category} news, reviews, and insights from our expert team.
              </p>
            </div>
          </div>
          
          {/* Filters and sort options */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            {/* Category navigation */}
            <div className="flex space-x-2">
              <Link 
                to="/category/movie"
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  category === 'movie' 
                    ? 'bg-entertainment-movie/10 text-entertainment-movie font-medium' 
                    : 'hover:bg-secondary'
                }`}
              >
                Movies
              </Link>
              <Link 
                to="/category/game"
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  category === 'game' 
                    ? 'bg-entertainment-game/10 text-entertainment-game font-medium' 
                    : 'hover:bg-secondary'
                }`}
              >
                Games
              </Link>
              <Link 
                to="/category/tech"
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  category === 'tech' 
                    ? 'bg-entertainment-tech/10 text-entertainment-tech font-medium' 
                    : 'hover:bg-secondary'
                }`}
              >
                Tech
              </Link>
            </div>
            
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortMenu(!showSortMenu)}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg"
              >
                <span>Sort by:</span>
                <span className="font-medium">
                  {sortOptions.find(option => option.value === sortBy)?.label}
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {/* Dropdown menu */}
              {showSortMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-md z-30">
                  <div className="p-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortMenu(false);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md hover:bg-secondary ${
                          sortBy === option.value ? 'bg-secondary font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Posts grid */}
          {posts.length > 0 ? (
            <PostGrid posts={posts} />
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts found in this category.</p>
              <Link to="/" className="text-primary mt-4 inline-block hover:underline">
                Return to home
              </Link>
            </div>
          )}
          
          {/* Pagination example */}
          {posts.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex space-x-1">
                <button
                  disabled
                  className="px-4 py-2 text-sm rounded-md bg-secondary/50 text-muted-foreground"
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground"
                >
                  1
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-md hover:bg-secondary"
                >
                  2
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-md hover:bg-secondary"
                >
                  3
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-md hover:bg-secondary"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Category;
