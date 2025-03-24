
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, Link as LinkIcon, Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner';

interface RichTextEditorProps {
  initialContent?: string;
  onSave: (content: { 
    title: string;
    excerpt: string;
    content: string;
    imageUrl: string;
    category: string;
  }) => void;
  isSaving?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  initialContent = '', 
  onSave,
  isSaving = false
}) => {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState(initialContent);
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const handleFormat = (format: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'left':
        formattedText = `<div style="text-align: left">${selectedText}</div>`;
        break;
      case 'center':
        formattedText = `<div style="text-align: center">${selectedText}</div>`;
        break;
      case 'right':
        formattedText = `<div style="text-align: right">${selectedText}</div>`;
        break;
      case 'ul':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      case 'ol':
        formattedText = selectedText.split('\n').map((line, i) => `${i+1}. ${line}`).join('\n');
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };
  
  const handleLink = () => {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text:');
    
    if (url && text) {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const linkText = `[${text}](${url})`;
      
      const newContent = content.substring(0, start) + linkText + content.substring(end);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + linkText.length, start + linkText.length);
      }, 0);
    }
  };
  
  const handleImage = () => {
    const url = prompt('Enter image URL:');
    const alt = prompt('Enter image description:');
    
    if (url) {
      const textarea = textareaRef.current;
      if (!textarea) return;
      
      const start = textarea.selectionStart;
      const imageText = `![${alt || 'image'}](${url})`;
      
      const newContent = content.substring(0, start) + imageText + content.substring(start);
      setContent(newContent);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + imageText.length, start + imageText.length);
      }, 0);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // In a real app, you would upload this to your server or a storage service
    // For now, we'll just create a local URL for the demo
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    toast.success("Image uploaded successfully! (Demo only - not actually saved to server)");
  };
  
  const handleSave = () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }
    
    if (!content) {
      toast.error("Please enter content");
      return;
    }
    
    onSave({
      title,
      excerpt: excerpt || title.substring(0, 100) + '...',
      content,
      imageUrl,
      category: category || 'Uncategorized'
    });
  };
  
  return (
    <div className="border rounded-md p-4">
      <div className="mb-4">
        <Input
          placeholder="Article Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xl font-bold mb-2"
        />
        <Input
          placeholder="Category (e.g., movie, game, tech)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-2"
        />
        <Textarea
          placeholder="Brief excerpt/summary of the article"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mb-2"
          rows={2}
        />
        
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
          <div className="flex items-center gap-2">
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
            />
            <Input
              placeholder="Or enter image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="Preview" className="h-32 object-cover rounded" />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-1 mb-2 p-1 border rounded">
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('bold')}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('italic')}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('underline')}>
          <Underline className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('left')}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('center')}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('right')}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('ul')}>
          <List className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={() => handleFormat('ol')}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleLink}>
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button type="button" variant="ghost" size="icon" onClick={handleImage}>
          <ImageIcon className="h-4 w-4" />
        </Button>
      </div>
      
      <Textarea
        ref={textareaRef}
        placeholder="Write your article content here... (Supports Markdown and some HTML)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px] font-mono"
        rows={15}
      />
      
      <div className="flex justify-end mt-4">
        <Button type="button" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Article'}
        </Button>
      </div>
    </div>
  );
};

export default RichTextEditor;
