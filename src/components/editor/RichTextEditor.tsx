
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered,
  Heading1,
  Heading2, 
  Image as ImageIcon,
  Link as LinkIcon
} from "lucide-react";

interface RichTextEditorProps {
  initialContent?: string;
  initialTitle?: string;
  initialExcerpt?: string;
  initialAuthorName?: string;
  onSave: (data: any) => void;
  isSaving: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  initialTitle = '',
  initialExcerpt = '',
  initialAuthorName = '',
  onSave,
  isSaving
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [authorName, setAuthorName] = useState(initialAuthorName);
  
  const handleSave = () => {
    onSave({
      title,
      excerpt,
      content,
      authorName
    });
  };

  const insertMarkdown = (markdownSyntax: string) => {
    setContent(prev => prev + markdownSyntax);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Article Title</Label>
        <Input
          id="title"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="excerpt">Short Excerpt</Label>
        <Textarea
          id="excerpt"
          placeholder="Brief summary of your article..."
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="authorName">Author Name</Label>
        <Input
          id="authorName"
          placeholder="Enter your name..."
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
      </div>
      
      <div className="border rounded-md p-1 flex flex-wrap gap-1 bg-muted/50">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('**Bold Text**')}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('*Italic Text*')}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('\n# Heading 1\n')}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('\n## Heading 2\n')}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('\n- List item\n- List item\n- List item\n')}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('\n1. Ordered item\n2. Ordered item\n3. Ordered item\n')}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('\n![Image description](https://example.com/image.jpg)\n')}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => insertMarkdown('[Link text](https://example.com)')}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content (Markdown)</Label>
        <Textarea
          id="content"
          placeholder="Write your article using Markdown syntax..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] font-mono text-sm"
        />
      </div>
      
      <Button 
        onClick={handleSave} 
        disabled={isSaving}
        className="w-full"
      >
        {isSaving ? 'Saving...' : 'Save Post'}
      </Button>
    </div>
  );
};

export default RichTextEditor;
