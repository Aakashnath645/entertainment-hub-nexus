
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { Post, Category } from '@/utils/mockData';
import PostCard from '../posts/PostCard';
import { cn } from '@/lib/utils';

interface CategorySectionProps {
  title: string;
  category: Category;
  posts: Post[];
  className?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  category,
  posts,
  className,
}) => {
  // Only show up to 3 posts per category
  const displayPosts = posts.slice(0, 3);
  
  const getCategoryColor = (category: Category) => {
    switch (category) {
      case 'movie':
        return 'border-entertainment-movie';
      case 'game':
        return 'border-entertainment-game';
      case 'tech':
        return 'border-entertainment-tech';
      default:
        return 'border-primary';
    }
  };

  // Check if there are any posts in this category
  const hasPosts = displayPosts.length > 0;

  return (
    <section className={cn("py-12", className)}>
      <div className="container px-6 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold pl-4 ${getCategoryColor(category)}`}>
            {title}
          </h2>
          {hasPosts && (
            <Link 
              to={`/category/${category}`}
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        
        {hasPosts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="py-8 border border-dashed rounded-xl flex flex-col items-center justify-center">
            <p className="text-muted-foreground mb-4">No articles in this category yet</p>
            <Link
              to={`/admin/posts?category=${category}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-card rounded-lg hover:bg-accent transition-colors text-sm"
            >
              <PlusCircle className="h-4 w-4" />
              Add {title} Article
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategorySection;
