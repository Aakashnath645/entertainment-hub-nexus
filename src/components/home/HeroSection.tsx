
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle } from 'lucide-react';
import { mockPosts } from '@/utils/mockData';

const HeroSection: React.FC = () => {
  const hasPosts = mockPosts.length > 0;
  
  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[800px] w-full overflow-hidden">
      {/* Hero background image with animation */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/placeholder.svg" 
          alt="Entertainment Blog Hero"
          className="w-full h-full object-cover animate-hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content container */}
      <div className="container relative z-10 h-full mx-auto px-6 flex flex-col justify-end pb-16">
        <div className="max-w-3xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Welcome message */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            {hasPosts ? 'Your Entertainment Blog' : 'Create Your Entertainment Blog'}
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            {hasPosts 
              ? 'The latest in movies, gaming, and technology - all in one place'
              : 'Start adding articles about movies, gaming, and technology to build your blog'
            }
          </p>
          
          {/* CTA button */}
          <Link 
            to="/admin/posts"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:translate-y-[-2px] transition-all duration-200 active:translate-y-0 mr-4"
          >
            <PlusCircle className="h-5 w-5" />
            {hasPosts ? 'Create Article' : 'Create Your First Article'}
          </Link>
          
          <Link 
            to="/admin"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-primary/20 hover:bg-primary/10 transition-all duration-200"
          >
            Manage Blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
