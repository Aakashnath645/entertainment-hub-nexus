
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface RichTextEditorProps {
  initialContent?: string;
  initialTitle?: string;
  initialExcerpt?: string;
  initialAuthorName?: string;
  initialCategory?: string;
  onSave: (data: any) => void;
  isSaving: boolean;
  onContentUpdate?: (data: any) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent = '',
  initialTitle = '',
  initialExcerpt = '',
  initialAuthorName = '',
  initialCategory = 'tech',
  onSave,
  isSaving,
  onContentUpdate
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [excerpt, setExcerpt] = useState(initialExcerpt);
  const [authorName, setAuthorName] = useState(initialAuthorName);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    if (onContentUpdate) {
      onContentUpdate({
        title,
        content,
        authorName,
        excerpt,
        category
      });
    }
  }, [title, content, authorName, excerpt, category, onContentUpdate]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      content,
      authorName,
      excerpt,
      category
    });
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-full"
          required
        />
      </div>

      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Enter a short description"
          className="w-full h-20"
          required
        />
      </div>

      <div>
        <Label htmlFor="authorName">Author</Label>
        <Input
          id="authorName"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your name"
          className="w-full"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="movie">Movies & TV</SelectItem>
            <SelectItem value="series">TV Series</SelectItem>
            <SelectItem value="comics">Comics & Manga</SelectItem>
            <SelectItem value="game">Gaming</SelectItem>
            <SelectItem value="tech">Technology</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          className="w-full min-h-[300px]"
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save Post'}
      </Button>
    </form>
  );
};

export default RichTextEditor;
