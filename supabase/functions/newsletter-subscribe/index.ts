import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 405 
        }
      );
    }

    const { email, preferences = [] } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Valid email address is required' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400 
        }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    console.log('Subscribing email to newsletter:', email);

    // Check if email already exists
    const { data: existing, error: checkError } = await supabaseClient
      .from('newsletter_subscriptions')
      .select('id, unsubscribed_at')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error checking existing subscription:', checkError);
      return new Response(
        JSON.stringify({ error: 'Database error' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    if (existing) {
      if (existing.unsubscribed_at) {
        // Resubscribe
        const { error: updateError } = await supabaseClient
          .from('newsletter_subscriptions')
          .update({
            preferences,
            unsubscribed_at: null,
            subscribed_at: new Date().toISOString()
          })
          .eq('email', email);

        if (updateError) {
          console.error('Error resubscribing:', updateError);
          return new Response(
            JSON.stringify({ error: 'Failed to resubscribe' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 500 
            }
          );
        }

        console.log('Email resubscribed successfully');
        return new Response(
          JSON.stringify({ message: 'Successfully resubscribed to newsletter' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      } else {
        return new Response(
          JSON.stringify({ message: 'Email already subscribed' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    }

    // New subscription
    const { error: insertError } = await supabaseClient
      .from('newsletter_subscriptions')
      .insert({
        email,
        preferences,
        subscribed_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error inserting subscription:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to subscribe' }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500 
        }
      );
    }

    console.log('Email subscribed successfully');

    return new Response(
      JSON.stringify({ message: 'Successfully subscribed to newsletter' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});