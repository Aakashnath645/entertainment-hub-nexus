
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { mockPosts } from '@/utils/mockData';

const AdminSchedule: React.FC = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [scheduledPosts, setScheduledPosts] = useState(
    mockPosts.slice(0, 5).map(post => ({
      ...post,
      scheduledDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
    }))
  );

  const handleReschedule = () => {
    toast({
      title: "Schedule Updated",
      description: "Post has been rescheduled successfully",
    });
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
                      <TableCell>{format(post.scheduledDate, 'PPP p')}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Clock className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reschedule Post</DialogTitle>
                              <DialogDescription>
                                Choose a new date and time for "{post.title}"
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <Calendar
                                mode="single"
                                selected={post.scheduledDate}
                                onSelect={(date) => setDate(date)}
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
                                    defaultValue={format(post.scheduledDate, 'HH:mm')}
                                  />
                                </div>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline">Cancel</Button>
                              <Button onClick={handleReschedule}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                  {scheduledPosts
                    .filter(post => date && format(post.scheduledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                    .map(post => (
                      <li key={post.id} className="text-sm border-l-2 border-primary pl-2">
                        {post.title} - {format(post.scheduledDate, 'p')}
                      </li>
                    ))
                  }
                  {scheduledPosts
                    .filter(post => date && format(post.scheduledDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                    .length === 0 && (
                      <li className="text-sm text-muted-foreground">No posts scheduled for this date</li>
                    )
                  }
                </ul>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSchedule;
