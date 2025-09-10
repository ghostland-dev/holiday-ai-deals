import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Clock, Star, Plane, Building, Package, Activity, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { monitoring } from "@/utils/monitoring";
import { useAuthContext } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import AuthModal from './AuthModal';

interface Deal {
  id: string;
  title: string;
  description: string;
  destination: string;
  price: number;
  original_price?: number;
  currency: string;
  image_url?: string;
  category: string;
  provider: string;
  provider_url: string;
  featured: boolean;
  available_from?: string;
  available_to?: string;
  tags: string[];
  click_count: number;
  created_at: string;
  updated_at: string;
}

const categoryIcons = {
  flight: Plane,
  hotel: Building,
  package: Package,
  activity: Activity,
};

const DealsGrid = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlisted, setWishlisted] = useState<Record<string, boolean>>({});
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuthContext();
  const { toast } = useToast();

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDeals(data || []);
    } catch (err) {
      console.error('Error fetching deals:', err);
      setError('Impossible de charger les offres');
    } finally {
      setLoading(false);
    }
  };

  const handleDealClick = async (deal: Deal) => {
    try {
      // Track click
      const { error } = await supabase
        .from('deals')
        .update({ click_count: deal.click_count + 1 })
        .eq('id', deal.id);

      if (error) throw error;

      // Open provider link
      window.open(deal.provider_url, '_blank');
      
      // Log analytics
      monitoring.logUserAction('deal_click', {
        deal_id: deal.id,
        provider: deal.provider,
        destination: deal.destination,
        price: deal.price
      });
    } catch (err) {
      console.error('Error tracking deal click:', err);
    }
  };

  const handleWishlist = async (dealId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    const isCurrentlyWishlisted = wishlisted[dealId];

    // Toggle wishlist status locally for immediate feedback
    setWishlisted(prev => ({
      ...prev,
      [dealId]: !prev[dealId]
    }));

    try {
      const { error } = await supabase.functions.invoke('manage-wishlist', {
        body: { 
          action: isCurrentlyWishlisted ? 'remove' : 'add',
          deal_id: dealId
        }
      });

      if (error) throw error;
      
      toast({
        title: isCurrentlyWishlisted ? "Removed from wishlist" : "Added to wishlist",
        description: isCurrentlyWishlisted ? "Deal removed from your favorites" : "Deal saved to your wishlist"
      });
    } catch (error) {
      // Revert the optimistic update on error
      setWishlisted(prev => ({
        ...prev,
        [dealId]: !prev[dealId]
      }));
      
      console.error('Error managing wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to update wishlist",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{error}</p>
        <Button onClick={fetchDeals} variant="outline" className="mt-2">
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {deals.map((deal) => {
        const categoryIconMap: Record<string, any> = categoryIcons;
        const Icon = categoryIconMap[deal.category] || Package;
        const discount = deal.original_price 
          ? Math.round(((deal.original_price - deal.price) / deal.original_price) * 100)
          : 0;

        return (
          <Card 
            key={deal.id} 
            className={`group hover:shadow-lg transition-all duration-300 ${
              deal.featured ? 'ring-2 ring-primary/20' : ''
            }`}
          >
            <CardHeader className="pb-3">
              <div className="relative">
                {deal.image_url && (
                  <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={deal.image_url} 
                      alt={deal.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                )}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary" />
                    <Badge variant="secondary">{deal.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleWishlist(deal.id, e)}
                      className={`p-2 ${wishlisted[deal.id] ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'}`}
                    >
                      <Heart className={`w-4 h-4 ${wishlisted[deal.id] ? 'fill-current' : ''}`} />
                    </Button>
                    {deal.featured && (
                      <Badge className="bg-gradient-sunset text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Populaire
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <CardTitle className="text-lg leading-tight">{deal.title}</CardTitle>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-3 h-3" />
                <span className="text-sm">{deal.destination}</span>
              </div>
            </CardHeader>
            
            <CardContent className="pb-3">
              <CardDescription className="line-clamp-2 mb-3">
                {deal.description}
              </CardDescription>
              
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">
                    {deal.price}€
                  </span>
                  {deal.original_price && (
                    <span className="text-sm text-muted-foreground line-through">
                      {deal.original_price}€
                    </span>
                  )}
                </div>
                {discount > 0 && (
                  <Badge variant="destructive" className="bg-green-500">
                    -{discount}%
                  </Badge>
                )}
              </div>

              {deal.tags && deal.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {deal.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{deal.provider}</span>
                {deal.click_count > 0 && (
                  <span>• {deal.click_count} vues</span>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                onClick={() => handleDealClick(deal)}
                className="w-full bg-gradient-sunset hover:shadow-glow transition-all duration-300"
              >
                Voir l'offre
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </div>
  );
};

export default DealsGrid;