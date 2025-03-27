
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Comment } from '@/services/commentService';
import { formatDistanceToNow } from 'date-fns';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        No comments yet. Be the first to share your thoughts!
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name ? name.substring(0, 2).toUpperCase() : '?';
  };

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} className="p-6 bg-card border border-border rounded-xl">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              {comment.author_image ? (
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={comment.author_image} 
                    alt={comment.author_name}
                  />
                  <AvatarFallback>{getInitials(comment.author_name)}</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{getInitials(comment.author_name)}</AvatarFallback>
                </Avatar>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{comment.author_name}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                </span>
              </div>
              <div className="text-sm mb-3 whitespace-pre-wrap">{comment.content}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
