import { useState } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { env } from '@/utils/environment';
import { analytics } from '@/utils/analytics';
import { monitoring } from '@/utils/monitoring';

interface PaymentState {
  loading: boolean;
  error: string | null;
  processing: boolean;
}

interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

const stripePromise = loadStripe(env.get('STRIPE_PUBLISHABLE_KEY') || '');

export const usePayment = () => {
  const [state, setState] = useState<PaymentState>({
    loading: false,
    error: null,
    processing: false,
  });

  const createPaymentIntent = async (
    amount: number,
    currency = 'eur',
    metadata?: Record<string, string>
  ): Promise<PaymentIntent | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(env.getApiUrl('/api/payments/create-intent'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(amount * 100), // Convert to cents
          currency,
          metadata,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du paiement');
      }

      const paymentIntent = await response.json();
      
      setState(prev => ({ ...prev, loading: false }));
      
      analytics.track({
        action: 'payment_intent_created',
        category: 'payment',
        value: amount,
        custom_parameters: {
          currency,
          payment_intent_id: paymentIntent.id,
        },
      });

      return paymentIntent;
    } catch (error: any) {
      console.error('Create payment intent error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de la création du paiement',
      }));
      
      monitoring.reportError({
        message: error.message,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date(),
        sessionId: monitoring.getSessionInfo().sessionId,
        buildVersion: env.get('APP_VERSION'),
        environment: env.get('NODE_ENV'),
      });

      return null;
    }
  };

  const processPayment = async (
    clientSecret: string,
    paymentMethodId: string
  ): Promise<boolean> => {
    setState(prev => ({ ...prev, processing: true, error: null }));

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });

      if (error) {
        throw error;
      }

      if (paymentIntent?.status === 'succeeded') {
        setState(prev => ({ ...prev, processing: false }));
        
        analytics.track({
          action: 'payment_succeeded',
          category: 'payment',
          value: paymentIntent.amount / 100,
          custom_parameters: {
            payment_intent_id: paymentIntent.id,
            currency: paymentIntent.currency,
          },
        });

        return true;
      } else {
        throw new Error('Paiement non confirmé');
      }
    } catch (error: any) {
      console.error('Process payment error:', error);
      setState(prev => ({
        ...prev,
        processing: false,
        error: error.message || 'Erreur lors du traitement du paiement',
      }));
      
      analytics.track({
        action: 'payment_failed',
        category: 'payment',
        custom_parameters: {
          error: error.message,
          error_type: error.type,
        },
      });

      return false;
    }
  };

  const createSubscription = async (
    priceId: string,
    paymentMethodId: string
  ): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(env.getApiUrl('/api/payments/create-subscription'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: priceId,
          payment_method_id: paymentMethodId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de l\'abonnement');
      }

      const subscription = await response.json();
      
      setState(prev => ({ ...prev, loading: false }));
      
      analytics.track({
        action: 'subscription_created',
        category: 'subscription',
        custom_parameters: {
          subscription_id: subscription.id,
          price_id: priceId,
          status: subscription.status,
        },
      });

      return subscription.status === 'active';
    } catch (error: any) {
      console.error('Create subscription error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de la création de l\'abonnement',
      }));

      return false;
    }
  };

  const cancelSubscription = async (subscriptionId: string): Promise<boolean> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(env.getApiUrl('/api/payments/cancel-subscription'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription_id: subscriptionId,
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'annulation de l\'abonnement');
      }

      setState(prev => ({ ...prev, loading: false }));
      
      analytics.track({
        action: 'subscription_cancelled',
        category: 'subscription',
        custom_parameters: {
          subscription_id: subscriptionId,
        },
      });

      return true;
    } catch (error: any) {
      console.error('Cancel subscription error:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Erreur lors de l\'annulation de l\'abonnement',
      }));

      return false;
    }
  };

  const getSubscriptionPlans = (): SubscriptionPlan[] => {
    return [
      {
        id: 'free',
        name: 'Gratuit',
        price: 0,
        interval: 'month',
        features: [
          'Accès aux deals de base',
          'Notifications par email',
          'Support communautaire',
        ],
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 9.99,
        interval: 'month',
        features: [
          'Accès à tous les deals',
          'Deals exclusifs',
          'Notifications push instantanées',
          'Support prioritaire',
          'Historique des voyages',
          'Alertes prix personnalisées',
        ],
      },
      {
        id: 'enterprise',
        name: 'Entreprise',
        price: 29.99,
        interval: 'month',
        features: [
          'Tout Premium inclus',
          'API access',
          'Deals entreprise',
          'Gestionnaire de compte dédié',
          'Intégrations avancées',
          'Analytics détaillées',
          'Support 24/7',
        ],
      },
    ];
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  return {
    ...state,
    createPaymentIntent,
    processPayment,
    createSubscription,
    cancelSubscription,
    getSubscriptionPlans,
    clearError,
  };
};