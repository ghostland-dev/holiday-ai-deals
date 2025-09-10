import { createClient } from '@supabase/supabase-js';
import { env } from '@/utils/environment';

const supabaseUrl = env.get('SUPABASE_URL') || 'https://your-project.supabase.co';
const supabaseAnonKey = env.get('SUPABASE_ANON_KEY') || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  subscription_tier?: 'free' | 'premium' | 'enterprise';
  preferences?: {
    destinations: string[];
    budget_range: [number, number];
    notifications: boolean;
  };
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  destination: string;
  image_url: string;
  provider: string;
  affiliate_url: string;
  valid_until: string;
  featured: boolean;
  active: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
  clicks: number;
  conversions: number;
}

export interface Booking {
  id: string;
  user_id: string;
  deal_id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  booking_reference: string;
  total_amount: number;
  commission_earned: number;
  created_at: string;
  updated_at: string;
}

// Auth helpers
export const signUp = async (email: string, password: string, fullName?: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Social auth
export const signInWithProvider = async (provider: 'google' | 'facebook' | 'github') => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { data, error };
};

// Database operations
export const getDeals = async (filters?: {
  destination?: string;
  maxPrice?: number;
  featured?: boolean;
  limit?: number;
  offset?: number;
}) => {
  let query = supabase
    .from('deals')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (filters?.destination) {
    query = query.ilike('destination', `%${filters.destination}%`);
  }
  
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }
  
  if (filters?.featured) {
    query = query.eq('featured', true);
  }
  
  if (filters?.limit) {
    query = query.limit(filters.limit);
  }
  
  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;
  return { data, error };
};

export const getDealById = async (id: string) => {
  const { data, error } = await supabase
    .from('deals')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const trackDealClick = async (dealId: string) => {
  const { error } = await supabase.rpc('increment_deal_clicks', {
    deal_id: dealId,
  });
  
  return { error };
};

export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([booking])
    .select()
    .single();
  
  return { data, error };
};

export const getUserBookings = async (userId: string) => {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      deals (
        title,
        destination,
        image_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// User preferences
export const updateUserPreferences = async (userId: string, preferences: User['preferences']) => {
  const { data, error } = await supabase
    .from('users')
    .update({ preferences })
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};

// Newsletter subscription
export const subscribeNewsletter = async (email: string, preferences?: string[]) => {
  const { data, error } = await supabase
    .from('newsletter_subscriptions')
    .insert([{
      email,
      preferences: preferences || [],
      subscribed_at: new Date().toISOString(),
    }])
    .select()
    .single();
  
  return { data, error };
};

// Real-time subscriptions
export const subscribeToDeals = (callback: (payload: any) => void) => {
  return supabase
    .channel('deals')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'deals' },
      callback
    )
    .subscribe();
};

export const subscribeToUserBookings = (userId: string, callback: (payload: any) => void) => {
  return supabase
    .channel('user_bookings')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'bookings',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe();
};