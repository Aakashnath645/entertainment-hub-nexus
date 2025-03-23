
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className, 
  placeholder = "Search articles..." 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchValue);
    // In a real app, you would perform a search here
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={cn(
        "relative flex items-center w-full",
        className
      )}
    >
      <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-full bg-secondary pl-9 pr-12 py-2 text-sm",
          "placeholder:text-muted-foreground focus:outline-none focus:ring-2",
          "focus:ring-primary/20 transition-all duration-200",
          isFocused && "ring-2 ring-primary/20"
        )}
      />
      {searchValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-9 rounded-full hover:bg-primary/10 p-1"
          aria-label="Clear search"
        >
          <X className="h-3 w-3 text-muted-foreground" />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          "absolute right-1.5 h-7 w-7 rounded-full bg-primary text-primary-foreground",
          "flex items-center justify-center transition-transform duration-200",
          "hover:scale-105 active:scale-95"
        )}
        aria-label="Submit search"
      >
        <Search className="h-3.5 w-3.5" />
      </button>
    </form>
  );
};

export default SearchBar;
