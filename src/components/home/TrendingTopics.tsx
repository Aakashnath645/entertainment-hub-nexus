
import React from 'react';
import { Link } from 'react-router-dom';
import { Hash } from 'lucide-react';
import { trendingTopics } from '@/utils/mockData';
import { cn } from '@/lib/utils';

interface TrendingTopicsProps {
  className?: string;
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ className }) => {
  return (
    <div className={cn("bg-card border border-border/50 rounded-xl overflow-hidden", className)}>
      <div className="p-4 border-b border-border flex items-center gap-2">
        <Hash className="h-4 w-4 text-entertainment-game" />
        <h3 className="font-semibold">Trending Topics</h3>
      </div>
      
      <div className="p-4">
        <ul className="space-y-3">
          {trendingTopics.map((topic) => (
            <li key={topic.id}>
              <Link 
                to={`/topic/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between group"
              >
                <span className="group-hover:text-foreground transition-colors text-muted-foreground">
                  #{topic.name}
                </span>
                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                  {topic.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingTopics;
