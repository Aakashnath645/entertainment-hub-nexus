
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, AlertCircle, ArrowLeft } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(email);
      setMessage('Check your email for further instructions');
      toast({
        title: "Email Sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (err) {
      setError('Failed to reset password. Email may not be registered.');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reset password. Email may not be registered.",
        icon: <AlertCircle className="h-5 w-5" />
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Entertainment Blog</title>
        <meta name="description" content="Reset your password to regain access to your account" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
        <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-xl shadow-lg border border-border/50">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-foreground">Reset your password</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We'll send you an email with instructions to reset your password
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-md text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{message}</span>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-6"
                disabled={loading}
              >
                Reset Password
              </Button>
            </div>

            <div className="text-center">
              <Link to="/signin" className="flex items-center justify-center text-sm text-primary hover:text-primary/90">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
