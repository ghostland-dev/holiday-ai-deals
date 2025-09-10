import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiOptions {
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
}

export const useApi = <T>() => {
  const { toast } = useToast();
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (
    apiCall: () => Promise<T>,
    options: ApiOptions = { showErrorToast: true }
  ) => {
    setState({ data: null, loading: true, error: null });
    
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      
      if (options.showSuccessToast) {
        toast({
          title: "Succès",
          description: "Opération réalisée avec succès",
        });
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      setState({ data: null, loading: false, error: errorMessage });
      
      if (options.showErrorToast) {
        toast({
          title: "Erreur",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      throw error;
    }
  }, [toast]);

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, loading: false, error: null })
  };
};

// API Services
export const apiService = {
  // Affiliate Links Management
  generateAffiliateLink: async (provider: string, originalUrl: string): Promise<string> => {
    // Simulate API call - replace with real implementation
    await new Promise(resolve => setTimeout(resolve, 500));
    return `${originalUrl}?affiliate_id=travelai_${provider}_${Date.now()}`;
  },

  // Travel Deals Fetching
  fetchDeals: async (filters?: any): Promise<any[]> => {
    // Simulate API call to booking platforms
    await new Promise(resolve => setTimeout(resolve, 1000));
    return []; // Replace with real API implementation
  },

  // AI Pack Generation
  generateAIPack: async (preferences: any): Promise<any> => {
    // Simulate Gemini API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    return {
      id: `pack_${Date.now()}`,
      title: `Pack IA Personnalisé`,
      destinations: [],
      price: 0,
      // Replace with real Gemini API implementation
    };
  },

  // User Authentication
  signIn: async (email: string, password: string): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: { email, id: '1' }, token: 'fake_token' };
  },

  signUp: async (userData: any): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { user: userData, token: 'fake_token' };
  },

  // Analytics
  trackAffiliateClic: async (affiliateId: string, provider: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`Tracking affiliate click: ${affiliateId} from ${provider}`);
  }
};