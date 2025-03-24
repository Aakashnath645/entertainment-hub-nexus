
import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Configure marked options if needed
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Convert markdown to HTML and sanitize
  const createMarkup = () => {
    const rawMarkup = marked.parse(content);
    const sanitizedMarkup = DOMPurify.sanitize(rawMarkup);
    return { __html: sanitizedMarkup };
  };

  return (
    <div 
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={createMarkup()} 
    />
  );
};

export default MarkdownRenderer;
