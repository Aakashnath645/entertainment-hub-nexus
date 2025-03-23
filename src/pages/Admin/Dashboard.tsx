
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import SEO from '@/components/SEO';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { LayoutDashboard, FileText, Calendar, Search, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <>
      <SEO
        title="Admin Dashboard | Content Management"
        description="Manage your blog content, schedule posts, and optimize SEO."
      />
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center space-x-2">
              <LayoutDashboard className="h-6 w-6" />
              <h1 className="text-lg font-bold">Admin Panel</h1>
            </div>
            <p className="text-xs text-sidebar-foreground/70">Manage your content</p>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link to="/admin">
                  <SidebarMenuButton tooltip="Dashboard">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/admin/posts">
                  <SidebarMenuButton tooltip="Manage Posts">
                    <FileText className="h-4 w-4" />
                    <span>Posts</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/admin/schedule">
                  <SidebarMenuButton tooltip="Schedule Posts">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link to="/admin/seo">
                  <SidebarMenuButton tooltip="SEO Tools">
                    <Search className="h-4 w-4" />
                    <span>SEO Tools</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={logout} tooltip="Logout">
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h2 className="text-xl font-bold">Admin Dashboard</h2>
            </div>
          </div>
          <div className="p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboard;
