
import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for user preference in localStorage or system preference
    const isDarkMode = localStorage.getItem('dark-mode') === 'true' || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setDarkMode(isDarkMode);
    updateTheme(isDarkMode);
  }, []);

  const updateTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dark-mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dark-mode', 'false');
    }
  };

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
        "hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20"
      )}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <Sun className="h-5 w-5 transition-all duration-300" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-300" />
      )}
    </button>
  );
};

export default ThemeToggle;
