-- Create bookings table for reservations
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  deal_id UUID NOT NULL,
  deal_title TEXT NOT NULL,
  deal_destination TEXT NOT NULL,
  deal_provider TEXT NOT NULL,
  deal_provider_url TEXT,
  total_price NUMERIC NOT NULL,
  currency TEXT DEFAULT 'EUR',
  booking_details JSONB DEFAULT '{}',
  status TEXT DEFAULT 'pending',
  stripe_session_id TEXT,
  affiliate_commission NUMERIC DEFAULT 0,
  affiliate_click_id TEXT,
  external_booking_id TEXT,
  guest_email TEXT,
  guest_name TEXT,
  travelers_count INTEGER DEFAULT 1,
  travel_dates JSONB DEFAULT '{}',
  special_requests TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR 
    (user_id IS NULL AND guest_email IS NOT NULL)
  );

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (
    (user_id IS NOT NULL AND auth.uid() = user_id) OR 
    (user_id IS NULL AND guest_email IS NOT NULL)
  );

CREATE POLICY "Service can manage all bookings" ON public.bookings
  FOR ALL USING (true);

-- Create affiliate tracking table
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL,
  provider TEXT NOT NULL,
  provider_url TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  click_timestamp TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  referrer TEXT,
  ip_address TEXT,
  converted BOOLEAN DEFAULT false,
  commission_amount NUMERIC DEFAULT 0,
  booking_id UUID REFERENCES public.bookings(id)
);

-- Enable RLS for affiliate clicks
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service can manage affiliate clicks" ON public.affiliate_clicks
  FOR ALL USING (true);

-- Create insurance policies table
CREATE TABLE IF NOT EXISTS public.insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  booking_id UUID REFERENCES public.bookings(id),
  policy_type TEXT NOT NULL, -- 'essential', 'premium', 'platinum'
  price NUMERIC NOT NULL,
  currency TEXT DEFAULT 'EUR',
  coverage_details JSONB DEFAULT '{}',
  policy_number TEXT UNIQUE,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active',
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.insurance_policies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own policies" ON public.insurance_policies
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create policies" ON public.insurance_policies
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create real deals data
INSERT INTO public.deals (title, description, destination, price, original_price, currency, category, provider, provider_url, featured, tags, available_from, available_to, image_url) VALUES
('Séjour romantique à Paris', 'Hôtel 4* avec vue sur la Tour Eiffel, 3 nuits en chambre deluxe', 'Paris, France', 299, 399, 'EUR', 'hotels', 'Booking.com', 'https://booking.com/paris-hotel-eiffel', true, ARRAY['Romance', 'Luxe', 'Centre-ville'], '2024-03-01', '2024-12-31', 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=500&fit=crop'),
('Weekend à Tokyo', 'Découverte de la capitale japonaise, vol + hôtel 3 nuits', 'Tokyo, Japon', 899, 1199, 'EUR', 'packages', 'Expedia', 'https://expedia.com/tokyo-package', true, ARRAY['Culture', 'Gastronomie', 'Technologie'], '2024-04-01', '2024-11-30', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=500&fit=crop'),
('Escapade à Bali', 'Resort 5* en bord de plage, 5 nuits tout inclus', 'Bali, Indonésie', 599, 799, 'EUR', 'packages', 'TUI', 'https://tui.com/bali-resort', false, ARRAY['Plage', 'Détente', 'Exotisme'], '2024-03-15', '2024-10-31', 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=500&fit=crop'),
('City Break New York', 'Hôtel Manhattan + billets Broadway', 'New York, États-Unis', 499, 699, 'EUR', 'packages', 'Kayak', 'https://kayak.com/new-york-city', false, ARRAY['Urbain', 'Culture', 'Shopping'], '2024-02-01', '2024-12-15', 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=500&fit=crop'),
('Croisière Méditerranée', '7 jours Barcelona-Rome, pension complète', 'Méditerranée', 749, 999, 'EUR', 'cruises', 'MSC Croisières', 'https://msc.com/mediterranean', true, ARRAY['Croisière', 'Gastronomie', 'Détente'], '2024-05-01', '2024-09-30', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=500&fit=crop'),
('Safari Kenya', 'Safari 6 jours dans le Masai Mara avec guide expert', 'Kenya', 1299, 1599, 'EUR', 'activities', 'African Safari Co', 'https://africansafari.com/kenya', false, ARRAY['Safari', 'Nature', 'Aventure'], '2024-06-01', '2024-12-31', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&h=500&fit=crop');

-- Update deals with more details
UPDATE public.deals SET 
  description = 'Plongez dans l''atmosphère romantique de la Ville Lumière avec ce séjour d''exception. Hôtel 4 étoiles avec vue imprenable sur la Tour Eiffel, situé dans le 7ème arrondissement. Inclus: 3 nuits, petit-déjeuner, champagne de bienvenue.',
  max_participants = 2
WHERE title = 'Séjour romantique à Paris';

UPDATE public.deals SET 
  description = 'Découvrez Tokyo, métropole fascinante où tradition et modernité se rencontrent. Package comprenant vol direct, 3 nuits d''hôtel 4*, petit-déjeuner, guide francophone et JR Pass 3 jours.',
  max_participants = 4
WHERE title = 'Weekend à Tokyo';