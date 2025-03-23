
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail 
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 dark:bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-bold text-gradient">NexusBlog</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Your ultimate destination for movies, gaming, and tech content.
            </p>
            
            {/* Social links */}
            <div className="mt-5 flex space-x-4">
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-foreground transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/movie" className="text-muted-foreground hover:text-foreground transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/category/game" className="text-muted-foreground hover:text-foreground transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/category/tech" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tech
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company links */}
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter signup */}
          <div>
            <h3 className="font-medium mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for the latest news and updates.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-sm rounded-l-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground rounded-r-md px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom section with copyright */}
        <div className="mt-12 pt-6 border-t border-border text-center text-xs text-muted-foreground">
          <p>© {currentYear} NexusBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
