
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ThemeToggle from '../ui/ThemeToggle';
import SearchBar from '../ui/SearchBar';
import UserProfile from '../user/UserProfile';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 glass shadow-sm" : "py-5 bg-transparent"
      )}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight relative z-20"
          onClick={closeMenu}
        >
          <img 
            src="/lovable-uploads/5492abce-e7c9-46ec-9f9b-09b6753b7aa7.png" 
            alt="NexusBlog Logo" 
            className="h-12 w-auto"
          />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/category/movie" 
            className="px-4 py-2 rounded-full hover:bg-secondary transition-colors text-sm font-medium"
          >
            Movies
          </Link>
          <Link 
            to="/category/game" 
            className="px-4 py-2 rounded-full hover:bg-secondary transition-colors text-sm font-medium"
          >
            Games
          </Link>
          <Link 
            to="/category/tech" 
            className="px-4 py-2 rounded-full hover:bg-secondary transition-colors text-sm font-medium"
          >
            Tech
          </Link>
        </nav>
        
        {/* Desktop Search, Theme Toggle and User Profile */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar className="w-64" />
          <ThemeToggle />
          <UserProfile />
        </div>
        
        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 z-20"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 z-10 bg-background/95 backdrop-blur-sm md:hidden flex flex-col transition-transform duration-300 ease-in-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="pt-20 px-6 flex flex-col h-full">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/5492abce-e7c9-46ec-9f9b-09b6753b7aa7.png" 
                alt="NexusBlog Logo" 
                className="h-16 w-auto"
              />
            </div>
            
            <SearchBar className="mb-8" />
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/category/movie" 
                className="py-3 text-xl font-medium border-b border-border"
                onClick={closeMenu}
              >
                Movies
              </Link>
              <Link 
                to="/category/game" 
                className="py-3 text-xl font-medium border-b border-border"
                onClick={closeMenu}
              >
                Games
              </Link>
              <Link 
                to="/category/tech" 
                className="py-3 text-xl font-medium border-b border-border"
                onClick={closeMenu}
              >
                Tech
              </Link>
            </nav>
            
            <div className="mt-8 flex justify-center space-x-4">
              <ThemeToggle />
              <UserProfile />
            </div>
            
            <div className="mt-auto mb-8 flex justify-center">
              <p className="text-sm text-muted-foreground">© 2023 NexusBlog</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
