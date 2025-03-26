
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAdmin, loading } = useAuth();
  const location = useLocation();
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        // Get current user
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setIsCheckingAdmin(false);
          return;
        }
        
        // Check if user exists in admin_users table
        const { data, error } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', user.id)
          .single();
        
        if (error) {
          console.error("Error checking admin status:", error);
          setIsUserAdmin(false);
        } else {
          setIsUserAdmin(true);
        }
      } catch (error) {
        console.error("Error in checkAdminStatus:", error);
        setIsUserAdmin(false);
      } finally {
        setIsCheckingAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  if (loading || isCheckingAdmin) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }

  // If user is not admin according to our backend check
  if (!isUserAdmin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
