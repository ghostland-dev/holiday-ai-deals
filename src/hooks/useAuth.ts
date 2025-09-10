import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signUp, signIn, signOut, signInWithProvider } from '@/lib/supabase';
import { analytics } from '@/utils/analytics';
import { monitoring } from '@/utils/monitoring';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  signUp: (email: string, password: string, fullName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithProvider: (provider: 'google' | 'facebook' | 'github') => Promise<void>;
  clearError: () => void;
  resetPassword: (email: string) => Promise<void>;
}

export const useAuth = (): AuthState & AuthActions => {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setState(prev => ({
          ...prev,
          session,
          user: session?.user || null,
          loading: false,
        }));
      } catch (error) {
        console.error('Error getting session:', error);
        setState(prev => ({
          ...prev,
          loading: false,
          error: 'Erreur lors du chargement de la session',
        }));
      }
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      setState(prev => ({
        ...prev,
        session,
        user: session?.user || null,
        loading: false,
      }));

      // Analytics tracking
      if (event === 'SIGNED_IN' && session?.user) {
        analytics.identify(session.user.id, {
          email: session.user.email,
          name: session.user.user_metadata?.full_name,
          signInMethod: session.user.app_metadata?.provider || 'email',
        });
        analytics.track({
          action: 'user_signed_in',
          category: 'authentication',
          label: session.user.app_metadata?.provider || 'email',
        });
        monitoring.logUserAction('sign_in', {
          method: session.user.app_metadata?.provider || 'email',
        });
      } else if (event === 'SIGNED_OUT') {
        analytics.track({
          action: 'user_signed_out',
          category: 'authentication',
        });
        monitoring.logUserAction('sign_out');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignUp = async (email: string, password: string, fullName?: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await signUp(email, password, fullName);
      
      if (error) throw error;
      
      if (data.user && !data.session) {
        // Email confirmation required
        setState(prev => ({
          ...prev,
          loading: false,
          error: null,
        }));
        analytics.track({
          action: 'user_signup_confirmation_sent',
          category: 'authentication',
          custom_parameters: { email },
        });
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de l\'inscription',
      }));
      analytics.track({
        action: 'user_signup_failed',
        category: 'authentication',
        custom_parameters: { error: error.message },
      });
      monitoring.reportError({
        message: error.message,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        sessionId: monitoring.getSessionInfo().sessionId,
        buildVersion: import.meta.env.VITE_APP_VERSION || 'unknown',
        environment: import.meta.env.MODE,
      });
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      console.error('Sign in error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de la connexion',
      }));
      analytics.track({
        action: 'user_signin_failed',
        category: 'authentication',
        custom_parameters: { error: error.message },
      });
    }
  };

  const handleSignOut = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await signOut();
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      console.error('Sign out error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de la déconnexion',
      }));
    }
  };

  const handleSignInWithProvider = async (provider: 'google' | 'facebook' | 'github') => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { data, error } = await signInWithProvider(provider);
      
      if (error) throw error;
      
      // OAuth redirect will handle the rest
    } catch (error: any) {
      console.error('Provider sign in error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || `Erreur lors de la connexion avec ${provider}`,
      }));
      analytics.track({
        action: 'user_social_signin_failed',
        category: 'authentication',
        label: provider,
        custom_parameters: { error: error.message },
      });
    }
  };

  const handleResetPassword = async (email: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
      }));
      
      analytics.track({
        action: 'password_reset_requested',
        category: 'authentication',
        custom_parameters: { email },
      });
    } catch (error: any) {
      console.error('Password reset error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de la réinitialisation du mot de passe',
      }));
    }
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signOut: handleSignOut,
    signInWithProvider: handleSignInWithProvider,
    resetPassword: handleResetPassword,
    clearError,
  };
};