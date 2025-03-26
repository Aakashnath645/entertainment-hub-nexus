
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { fetchPosts, updatePost, Post } from '@/services/postService';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const AdminSchedule: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('12:00');
  const [isReschedulingOpen, setIsReschedulingOpen] = useState(false);
  const queryClient = useQueryClient();

  // Use React Query for data fetching with real-time capabilities
  const { data: allPosts = [], isLoading } = useQuery({
    queryKey: ['admin-posts-schedule'],
    queryFn: fetchPosts,
    staleTime: 1000, // 1 second
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Filter for scheduled posts only
  const scheduledPosts = allPosts.filter(post => post.status === 'scheduled');

  // Set up real-time subscription for posts changes
  useEffect(() => {
    const channel = supabase
      .channel('admin-schedule-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          console.log('Real-time update detected in schedule:', payload);
          queryClient.invalidateQueries({ queryKey: ['admin-posts-schedule'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const handleReschedule = async () => {
    if (!selectedPost || !date) {
      toast.error("Please select a post and date");
      return;
    }

    try {
      // Combine selected date with time
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const scheduledDate = new Date(date);
      scheduledDate.setHours(hours, minutes, 0, 0);

      const updatedPost = await updatePost(selectedPost.id, {
        scheduledDate,
        status: 'scheduled'
      }, selectedPost.author.id);

      if (updatedPost) {
        toast.success("Post has been rescheduled successfully");
        queryClient.invalidateQueries({ queryKey: ['admin-posts-schedule'] });
        setIsReschedulingOpen(false);
      }
    } catch (error) {
      console.error("Error rescheduling post:", error);
      toast.error("Failed to reschedule post");
    }
  };

  const openReschedulingDialog = (post: Post) => {
    setSelectedPost(post);
    if (post.scheduledDate) {
      setDate(post.scheduledDate);
      setSelectedTime(format(post.scheduledDate, 'HH:mm'));
    } else {
      setDate(new Date());
      setSelectedTime('12:00');
    }
    setIsReschedulingOpen(true);
  };

  const getPostsForSelectedDate = () => {
    if (!date) return [];
    
    return scheduledPosts.filter(post => 
      post.scheduledDate && format(post.scheduledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Posts</CardTitle>
              <CardDescription>Posts scheduled for publication</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center p-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : scheduledPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No scheduled posts found. Schedule a post to see it here.
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scheduledPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>
                          {post.scheduledDate 
                            ? format(post.scheduledDate, 'PPP p') 
                            : 'Not scheduled'}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openReschedulingDialog(post)}
                          >
                            <Clock className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>View scheduled content by date</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
            <CardFooter>
              <div className="w-full">
                <h3 className="font-medium mb-2">Scheduled for {date ? format(date, 'PP') : 'today'}</h3>
                <ul className="space-y-2">
                  {getPostsForSelectedDate().map(post => (
                    <li key={post.id} className="text-sm border-l-2 border-primary pl-2">
                      {post.title} - {post.scheduledDate ? format(post.scheduledDate, 'p') : ''}
                    </li>
                  ))}
                  {getPostsForSelectedDate().length === 0 && (
                    <li className="text-sm text-muted-foreground">No posts scheduled for this date</li>
                  )}
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Dialog open={isReschedulingOpen} onOpenChange={setIsReschedulingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Post</DialogTitle>
            <DialogDescription>
              Choose a new date and time for "{selectedPost?.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border mx-auto"
            />
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-1">
                <label className="text-sm">Time</label>
              </div>
              <div className="col-span-3">
                <input
                  type="time"
                  className="px-3 py-2 border rounded-md w-full"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReschedulingOpen(false)}>Cancel</Button>
            <Button onClick={handleReschedule}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSchedule;
