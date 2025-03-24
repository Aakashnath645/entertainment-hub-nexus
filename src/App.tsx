
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Post from "./pages/Post";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminIndex from "./pages/Admin/Index";
import AdminPosts from "./pages/Admin/Posts";
import AdminSchedule from "./pages/Admin/Schedule";
import AdminSEO from "./pages/Admin/SEO";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/post/:id" element={<Post />} />
              <Route path="/category/:category" element={<Category />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }>
                <Route index element={<AdminIndex />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="schedule" element={<AdminSchedule />} />
                <Route path="seo" element={<AdminSEO />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
