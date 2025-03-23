
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { heroPost } from '@/utils/mockData';

const HeroSection: React.FC = () => {
  // Generate formatted date
  const formattedDate = new Date(heroPost.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <section className="relative h-[80vh] min-h-[600px] max-h-[800px] w-full overflow-hidden">
      {/* Hero background image with animation */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroPost.imageUrl} 
          alt={heroPost.title}
          className="w-full h-full object-cover animate-hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Content container */}
      <div className="container relative z-10 h-full mx-auto px-6 flex flex-col justify-end pb-16">
        <div className="max-w-3xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Category badge */}
          <div className="inline-block px-3 py-1 rounded-full bg-entertainment-game/10 text-entertainment-game text-sm font-medium mb-4">
            {heroPost.category.charAt(0).toUpperCase() + heroPost.category.slice(1)}
          </div>
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
            {heroPost.title}
          </h1>
          
          {/* Excerpt */}
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            {heroPost.excerpt}
          </p>
          
          {/* Author and metadata */}
          <div className="flex flex-wrap items-center gap-6 mb-8">
            <div className="flex items-center gap-3">
              <img 
                src={heroPost.author.avatar} 
                alt={heroPost.author.name}
                className="h-10 w-10 rounded-full object-cover border-2 border-background"
              />
              <span className="font-medium">{heroPost.author.name}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-5 w-5 mr-2" />
              <span>{heroPost.readTime} min read</span>
            </div>
            <div className="text-muted-foreground">
              {formattedDate}
            </div>
          </div>
          
          {/* CTA button */}
          <Link 
            to={`/post/${heroPost.id}`}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:translate-y-[-2px] transition-all duration-200 active:translate-y-0"
          >
            Read Article
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
