-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create deals table for travel offers
CREATE TABLE public.deals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  destination TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  currency TEXT DEFAULT 'EUR',
  image_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('flight', 'hotel', 'package', 'activity')),
  provider TEXT NOT NULL,
  provider_url TEXT,
  featured BOOLEAN DEFAULT false,
  available_from DATE,
  available_to DATE,
  max_participants INTEGER,
  tags TEXT[],
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table for user reservations
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'EUR',
  booking_details JSONB DEFAULT '{}',
  external_booking_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create newsletter subscriptions table
CREATE TABLE public.newsletter_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  preferences TEXT[] DEFAULT '{}',
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for deals (public read access)
CREATE POLICY "Deals are publicly readable" ON public.deals FOR SELECT USING (true);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings" ON public.bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON public.bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own bookings" ON public.bookings FOR UPDATE USING (auth.uid() = user_id);

-- Newsletter subscriptions (public insert for signup, users can view/update their own)
CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample deals
INSERT INTO public.deals (title, description, destination, price, original_price, category, provider, provider_url, featured, image_url, tags) VALUES
('Vol Paris-Tokyo', 'Vol direct avec escale courte, bagages inclus', 'Tokyo, Japon', 649.99, 899.99, 'flight', 'Air France', 'https://airfrance.fr', true, '/placeholder.svg', ARRAY['asia', 'culture', 'popular']),
('Hôtel 4★ Rome Centre', '3 nuits en plein cœur de Rome, petit-déjeuner inclus', 'Rome, Italie', 199.99, 299.99, 'hotel', 'Booking.com', 'https://booking.com', true, '/placeholder.svg', ARRAY['europe', 'culture', 'city']),
('Pack Bali Complet', '7 jours tout inclus, vols + hôtel + activités', 'Bali, Indonésie', 1299.99, 1599.99, 'package', 'TUI', 'https://tui.fr', true, '/placeholder.svg', ARRAY['asia', 'beach', 'adventure']),
('Croisière Méditerranée', '5 jours Barcelona-Rome-Naples', 'Méditerranée', 449.99, 599.99, 'activity', 'MSC Croisières', 'https://msc.fr', false, '/placeholder.svg', ARRAY['europe', 'cruise', 'relax']),
('Safari Kenya', '4 jours dans les parcs nationaux', 'Nairobi, Kenya', 899.99, 1199.99, 'activity', 'Safari Tours', 'https://safari-tours.com', false, '/placeholder.svg', ARRAY['africa', 'wildlife', 'adventure']);