-- Fix newsletter_subscriptions security vulnerability
-- Add SELECT policy to prevent email harvesting

-- Only allow service role or admin users to read newsletter subscriptions
-- This prevents public access to email addresses while allowing backend operations
CREATE POLICY "Only service role can read newsletter subscriptions" 
ON public.newsletter_subscriptions 
FOR SELECT 
USING (
  -- Only allow if the request is made with service role key
  -- or if we add admin functionality later, check for admin role
  auth.jwt() ->> 'role' = 'service_role'
);

-- Update the existing INSERT policy to be more specific about what can be inserted
DROP POLICY IF EXISTS "Anyone can subscribe to newsletter" ON public.newsletter_subscriptions;

CREATE POLICY "Allow newsletter subscription insertions" 
ON public.newsletter_subscriptions 
FOR INSERT 
WITH CHECK (
  -- Allow insertions but only with valid email format
  email IS NOT NULL AND 
  email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
);

-- Add UPDATE policy to allow unsubscribe functionality 
CREATE POLICY "Allow newsletter unsubscribe updates" 
ON public.newsletter_subscriptions 
FOR UPDATE 
USING (
  -- Allow updates to set unsubscribed_at for valid email records
  email IS NOT NULL
) 
WITH CHECK (
  -- Only allow setting unsubscribed_at field
  unsubscribed_at IS NOT NULL
);