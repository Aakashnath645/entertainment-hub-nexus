
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { Search, FileText, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { mockPosts } from '@/utils/mockData';

const AdminSEO: React.FC = () => {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState('');
  const [progress, setProgress] = useState(78);
  
  const generateSitemap = () => {
    toast({
      title: "Success",
      description: "Sitemap has been generated and updated",
    });
  };

  const optimizeMetaTags = () => {
    toast({
      title: "Success",
      description: "Meta tags have been optimized for all posts",
    });
  };

  const handleSeoCheck = () => {
    // In a real app, this would analyze the post for SEO issues
    setTimeout(() => {
      toast({
        title: "SEO Analysis Complete",
        description: "Post has been analyzed for SEO optimization",
      });
    }, 1500);
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
                      />
                      <Button onClick={handleSeoCheck}>
                        <Search className="mr-2 h-4 w-4" /> Analyze
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
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span>Keyword Usage</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Good keyword placement in title, headings, and content. Keyword density is 2.3% which is optimal.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-amber-500 mr-2" />
                            <span>Meta Description</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Your meta description could be improved. It's currently 85 characters, but should be between 120-155 characters for optimal display in search results.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                            <span>Content Length</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Current content is only 350 words. For better SEO performance, aim for at least 700-1000 words for this topic.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger className="flex">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span>Readability</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          Your content has a Flesch reading ease score of 65, which is considered "plain English, easily understood by 13-15 year old students."
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
                      <span className="text-xs">Indexed URLs: 42</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                      <span className="text-xs">Last generated: 3 days ago</span>
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
