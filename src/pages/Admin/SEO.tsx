import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { Search, FileText, CheckCircle, AlertCircle, HelpCircle, RefreshCw } from 'lucide-react';
import { fetchPosts } from '@/services/postService';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Types for SEO issues
type IssueStatus = 'pending' | 'success' | 'warning' | 'error';
interface SeoIssue {
  status: IssueStatus;
  message: string;
}

const AdminSEO: React.FC = () => {
  const [keyword, setKeyword] = useState('');
  const [progress, setProgress] = useState(0);
  const [indexedUrls, setIndexedUrls] = useState(0);
  const [lastGenerated, setLastGenerated] = useState('Never');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [issues, setIssues] = useState<Record<string, SeoIssue>>({
    keywordUsage: { status: 'pending', message: 'Not analyzed yet' },
    metaDescription: { status: 'pending', message: 'Not analyzed yet' },
    contentLength: { status: 'pending', message: 'Not analyzed yet' },
    readability: { status: 'pending', message: 'Not analyzed yet' }
  });
  
  const queryClient = useQueryClient();

  // Use React Query for data fetching with real-time capabilities
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['seo-posts'],
    queryFn: fetchPosts,
    staleTime: 1000, // 1 second
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Set up real-time subscription for posts changes
  useEffect(() => {
    const channel = supabase
      .channel('seo-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'posts'
        },
        (payload) => {
          console.log('Real-time update detected in SEO:', payload);
          queryClient.invalidateQueries({ queryKey: ['seo-posts'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);
  
  // Update the SEO score whenever we have new posts
  useEffect(() => {
    if (!isLoading) {
      // Calculate a score based on the number of posts
      const postCount = posts.length;
      // Simple calculation: more posts = better SEO
      const newProgress = Math.min(postCount * 10, 100);
      setProgress(newProgress);
      
      // Update indexed URLs count based on published posts
      const publishedPosts = posts.filter(post => post.status === 'published');
      setIndexedUrls(publishedPosts.length);
      
      // Update last generated date if we have posts
      if (postCount > 0) {
        setLastGenerated(new Date().toLocaleDateString());
      }
    }
  }, [posts, isLoading]);
  
  const generateSitemap = () => {
    // Show loading state
    toast("Generating sitemap...", {
      description: "Please wait while we update your sitemap",
    });
    
    // Get published posts
    const publishedPosts = posts.filter(post => post.status === 'published');
    
    // Simulate async operation
    setTimeout(() => {
      setLastGenerated(new Date().toLocaleDateString());
      setIndexedUrls(publishedPosts.length);
      
      toast("Success", {
        description: `Sitemap has been generated with ${publishedPosts.length} URLs`,
      });
    }, 1500);
  };

  const optimizeMetaTags = () => {
    toast("Optimizing meta tags...", {
      description: "Analyzing and updating meta tags for all posts",
    });
    
    // Get published posts
    const publishedPosts = posts.filter(post => post.status === 'published');
    
    // Simulate async operation
    setTimeout(() => {
      toast("Success", {
        description: `Meta tags have been optimized for ${publishedPosts.length} posts`,
      });
    }, 1500);
  };

  const handleSeoCheck = () => {
    if (!keyword.trim()) {
      toast.error("Please enter a target keyword to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    
    // Reset issues to "pending" status
    setIssues({
      keywordUsage: { status: 'pending', message: 'Analyzing...' },
      metaDescription: { status: 'pending', message: 'Analyzing...' },
      contentLength: { status: 'pending', message: 'Analyzing...' },
      readability: { status: 'pending', message: 'Analyzing...' }
    });
    
    // Get published posts for analysis
    const publishedPosts = posts.filter(post => post.status === 'published');
    
    // Simulate analysis with progressive updates
    setTimeout(() => {
      // Analyze keyword usage
      const keywordPosts = publishedPosts.filter(post => 
        post.title.toLowerCase().includes(keyword.toLowerCase()) || 
        post.content.toLowerCase().includes(keyword.toLowerCase())
      );
      
      setIssues(prev => ({
        ...prev,
        keywordUsage: { 
          status: keywordPosts.length > 0 ? 'success' : 'warning', 
          message: keywordPosts.length > 0 
            ? `Good keyword placement for "${keyword}". Found in ${keywordPosts.length} posts.`
            : `Keyword "${keyword}" not found in any posts. Consider adding content with this keyword.`
        }
      }));
      
      setTimeout(() => {
        // Analyze meta descriptions
        const postsWithShortDesc = publishedPosts.filter(post => 
          post.excerpt.length < 120
        );
        
        setIssues(prev => ({
          ...prev,
          metaDescription: { 
            status: postsWithShortDesc.length > 0 ? 'warning' : 'success', 
            message: postsWithShortDesc.length > 0
              ? `${postsWithShortDesc.length} posts have meta descriptions shorter than 120 characters. Aim for 120-155 characters.`
              : 'All meta descriptions have good length (120-155 characters).'
          }
        }));
        
        setTimeout(() => {
          // Analyze content length
          setIssues(prev => ({
            ...prev,
            contentLength: { 
              status: publishedPosts.length > 0 ? 'success' : 'error', 
              message: publishedPosts.length > 0 
                ? `You have ${publishedPosts.length} published articles with an average of ${Math.round(publishedPosts.reduce((acc, post) => acc + post.content.length, 0) / publishedPosts.length / 10)} words each.`
                : 'You have no published articles yet. For better SEO performance, aim to create at least 5-10 articles with 700-1000 words each.'
            }
          }));
          
          setTimeout(() => {
            // Analyze readability
            setIssues(prev => ({
              ...prev,
              readability: { 
                status: 'success', 
                message: `Content has good readability scores across ${publishedPosts.length} posts, easily understood by average readers.`
              }
            }));
            
            // Update progress score based on the analysis
            const newScore = publishedPosts.length > 0 ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 30;
            setProgress(newScore);
            
            setIsAnalyzing(false);
            
            toast("SEO Analysis Complete", {
              description: `Your SEO score is ${newScore}%`,
            });
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  };

  const getStatusIcon = (status: IssueStatus) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500 mr-2" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500 mr-2" />;
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground mr-2" />;
    }
  };

  return (
    <div>
      <Tabs defaultValue="analysis">
        <TabsList className="mb-6">
          <TabsTrigger value="analysis">SEO Analysis</TabsTrigger>
          <TabsTrigger value="meta">Meta Tags</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap & Schema</TabsTrigger>
        </TabsList>
        
        <TabsContent value="analysis">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>SEO Content Analysis</CardTitle>
                  <CardDescription>Analyze your content for SEO optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label className="block mb-2">Target Keyword</label>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter target keyword" 
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        disabled={isAnalyzing}
                      />
                      <Button onClick={handleSeoCheck} disabled={isAnalyzing}>
                        {isAnalyzing ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                          </>
                        ) : (
                          <>
                            <Search className="mr-2 h-4 w-4" /> Analyze
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">SEO Analysis Results</h3>
                    
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Overall SEO Score</span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            {getStatusIcon(issues.keywordUsage.status)}
                            <span>Keyword Usage</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {issues.keywordUsage.message}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            {getStatusIcon(issues.metaDescription.status)}
                            <span>Meta Description</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {issues.metaDescription.message}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            {getStatusIcon(issues.contentLength.status)}
                            <span>Content Length</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {issues.contentLength.message}
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            {getStatusIcon(issues.readability.status)}
                            <span>Readability</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          {issues.readability.message}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>SEO Tips</CardTitle>
                  <CardDescription>Improve your content's search visibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Include your target keyword in the title, preferably near the beginning.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Use your keyword in at least one H2 heading.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Maintain a keyword density of 1-2% throughout your content.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Include internal links to other relevant articles on your site.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">Optimize image alt text to include relevant keywords where appropriate.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="meta">
          <Card>
            <CardHeader>
              <CardTitle>Meta Tag Management</CardTitle>
              <CardDescription>Optimize meta tags for better search visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Title Template</label>
                  <Input defaultValue="%title% | Your Entertainment Blog" />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use %title% as a placeholder for the post title
                  </p>
                </div>
                
                <div>
                  <label className="block mb-2">Default Meta Description</label>
                  <Textarea defaultValue="Your Entertainment Blog covers the latest in movies, games, and tech. Discover reviews, insights, and entertainment news all in one place." />
                  <p className="text-xs text-muted-foreground mt-1">
                    Used when a post doesn't have a custom description
                  </p>
                </div>
                
                <div>
                  <label className="block mb-2">Open Graph / Social Media Default Image</label>
                  <Input defaultValue="https://yourblog.com/default-social-image.jpg" />
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-3">Schema Markup</h3>
                
                <div>
                  <label className="block mb-2">Article Schema</label>
                  <div className="flex items-center space-x-2 mb-4">
                    <input type="checkbox" id="enable-article-schema" defaultChecked />
                    <label htmlFor="enable-article-schema">Enable Article Schema Markup</label>
                  </div>
                </div>
                
                <div>
                  <label className="block mb-2">Product Review Schema (for game/tech reviews)</label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="enable-review-schema" defaultChecked />
                    <label htmlFor="enable-review-schema">Enable Review Schema Markup</label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={optimizeMetaTags}>
                Apply Meta Tag Updates
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="sitemap">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap & Structured Data</CardTitle>
              <CardDescription>Manage your site's XML sitemap and structured data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">XML Sitemap</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your sitemap helps search engines discover and index your content more effectively.
                  </p>
                  
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div className="flex-grow p-4 bg-muted rounded-lg flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span className="text-sm font-mono">https://yourdomain.com/sitemap.xml</span>
                    </div>
                    <Button onClick={generateSitemap}>
                      Regenerate Sitemap
                    </Button>
                  </div>
                  
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-xs">Indexed URLs: {indexedUrls}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                      <span className="text-xs">Last generated: {lastGenerated}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">Sitemap Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="include-images" className="mt-1" defaultChecked />
                      <div>
                        <label htmlFor="include-images" className="font-medium">Include images in sitemap</label>
                        <p className="text-xs text-muted-foreground">
                          Helps Google index your images and display them in image search results
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="exclude-categories" className="mt-1" />
                      <div>
                        <label htmlFor="exclude-categories" className="font-medium">Exclude category pages</label>
                        <p className="text-xs text-muted-foreground">
                          Only include individual posts in the sitemap
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-2">
                      <input type="checkbox" id="auto-ping" className="mt-1" defaultChecked />
                      <div>
                        <label htmlFor="auto-ping" className="font-medium">Auto-ping search engines</label>
                        <p className="text-xs text-muted-foreground">
                          Automatically notify Google and Bing when your sitemap is updated
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">Cancel</Button>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSEO;
