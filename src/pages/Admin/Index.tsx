import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, FileText, Calendar, BarChart2, TrendingUp, AlertCircle } from 'lucide-react';
import { mockPosts } from '@/utils/mockData';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/api/mockApiService';

const AdminIndex: React.FC = () => {
  // Use React Query to fetch posts
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 30000, // 30 seconds
  });

  // Calculate stats based on fetched data
  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.length - 3,
    draftPosts: 3,
    scheduledPosts: 5,
    totalViews: 12567,
    averageReadTime: 4.2
  };

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPosts} published, {stats.draftPosts} drafts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduledPosts}</div>
            <p className="text-xs text-muted-foreground">
              Posts ready for publishing
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Read Time</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageReadTime} min</div>
            <p className="text-xs text-muted-foreground">
              Engagement metric
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Content</CardTitle>
              <CardDescription>Your latest published posts</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {recentPosts.map((post) => (
                  <li key={post.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {post.category} • {new Date(post.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {post.trending && (
                          <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" /> Trending
                          </span>
                        )}
                        {post.featured && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>SEO Overview</CardTitle>
              <CardDescription>Content optimization status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Posts with meta descriptions</span>
                    <span className="text-sm">92%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Posts with optimized titles</span>
                    <span className="text-sm">85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Posts with alt text for images</span>
                    <span className="text-sm">68%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                
                <ul className="mt-6">
                  <li className="flex items-center gap-2 text-sm text-amber-600 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span>3 posts missing meta descriptions</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>5 posts with low keyword density</span>
                  </li>
                </ul>
                
                <Button className="w-full mt-4" variant="outline" size="sm">
                  View Full SEO Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminIndex;
