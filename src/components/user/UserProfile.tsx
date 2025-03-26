
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Edit, BarChart, Shield } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const UserProfile: React.FC = () => {
  const { isAdmin, logout, adminEmail } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!isAdmin) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/admin-login')}
              className="rounded-full h-8 w-8 opacity-70 hover:opacity-100"
            >
              <Shield className="h-4 w-4" />
              <span className="sr-only">Admin Area</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Admin Area</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Get first letter of email for avatar
  const avatarLetter = adminEmail ? adminEmail[0].toUpperCase() : 'A';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarFallback>{avatarLetter}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Admin</p>
            <p className="text-xs leading-none text-muted-foreground">
              {adminEmail || 'Site Administrator'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/admin')}>
          <User className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/admin/posts')}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Write Articles</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/admin/stats')}>
          <BarChart className="mr-2 h-4 w-4" />
          <span>Analytics</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/admin/posts')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Manage Posts</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
