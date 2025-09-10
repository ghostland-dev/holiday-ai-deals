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

-- Simplified RLS Policies
CREATE POLICY "Users can view their own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can create bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Service can update bookings" ON public.bookings
  FOR UPDATE USING (true);

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
  policy_type TEXT NOT NULL,
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

CREATE POLICY "Service can manage policies" ON public.insurance_policies
  FOR ALL USING (true);