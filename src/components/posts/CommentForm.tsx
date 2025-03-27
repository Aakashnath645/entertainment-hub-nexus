
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { addComment, NewComment } from '@/services/commentService';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface CommentFormProps {
  postId: string;
  onCommentAdded: () => void;
}

const commentSchema = z.object({
  author_name: z.string().min(1, "Name is required"),
  author_email: z.string().email("Invalid email").optional().or(z.literal('')),
  content: z.string().min(3, "Comment is too short")
});

type CommentFormValues = z.infer<typeof commentSchema>;

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentAdded }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      author_name: '',
      author_email: '',
      content: ''
    }
  });

  const handleSubmit = async (values: CommentFormValues) => {
    setIsSubmitting(true);
    
    const newComment: NewComment = {
      post_id: postId,
      author_name: values.author_name,
      author_email: values.author_email,
      content: values.content
    };
    
    const result = await addComment(newComment);
    
    setIsSubmitting(false);
    
    if (result) {
      form.reset();
      onCommentAdded();
    }
  };

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : '?';
  };

  return (
    <div className="p-6 bg-card border border-border rounded-xl mb-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {getInitials(form.watch('author_name'))}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="author_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Your name *"
                          {...field}
                          className="w-full p-3 bg-background border border-border rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="author_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Your email (optional)"
                          type="email"
                          {...field}
                          className="w-full p-3 bg-background border border-border rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write a comment..."
                        {...field}
                        className="w-full p-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] text-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CommentForm;
