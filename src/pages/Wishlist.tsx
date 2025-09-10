import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, Star, MapPin, Calendar, Euro } from "lucide-react";
import { useAuthContext } from '@/components/AuthProvider';
import EmptyState from "@/components/EmptyState";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

interface WishlistItem {
  id: string;
  deal_id: string;
  deal_title: string;
  deal_destination: string;
  deal_price: number;
  deal_currency: string;
  deal_image_url?: string;
  deal_category: string;
  deal_tags: string[];
  created_at: string;
}

const Wishlist = () => {
  const { user } = useAuthContext();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('manage-wishlist', {
        body: { action: 'get' }
      });

      if (error) throw error;
      setWishlistItems(data?.items || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (dealId: string) => {
    try {
      const { error } = await supabase.functions.invoke('manage-wishlist', {
        body: { action: 'remove', deal_id: dealId }
      });

      if (error) throw error;
      
      setWishlistItems(prev => prev.filter(item => item.deal_id !== dealId));
      toast({
        title: "Removed",
        description: "Deal removed from wishlist"
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove from wishlist",
        variant: "destructive"
      });
    }
  };

  const viewDeal = (dealId: string) => {
    navigate(`/deals/${dealId}`);
  };

  if (!user) {
    return (
      <>
        <SEOHead 
          title="My Wishlist - TravelAI"
          description="Manage your travel wishlist on TravelAI"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <EmptyState
                type="no-favorites"
                title="Sign in to see your wishlist"
                description="You must be logged in to access your wishlist."
                actionLabel="Sign In"
                onAction={() => navigate("/login")}
              />
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <SEOHead 
          title="My Wishlist - TravelAI"
          description="Manage your travel wishlist on TravelAI"
        />
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-20 pb-16">
            <div className="container mx-auto px-4">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded-lg"></div>
                ))}
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead 
        title="My Wishlist - TravelAI"
        description="Manage your travel wishlist on TravelAI"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-foreground">My Wishlist</h1>
                <p className="text-muted-foreground">
                  {wishlistItems.length} deal{wishlistItems.length !== 1 ? 's' : ''} saved
                </p>
              </div>

              {wishlistItems.length === 0 ? (
                <EmptyState
                  type="no-favorites"
                  title="Your wishlist is empty"
                  description="Add deals to your wishlist to find them easily later."
                  actionLabel="Browse Deals"
                  onAction={() => navigate("/")}
                />
              ) : (
                <div className="grid gap-6">
                  {wishlistItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="flex flex-col md:flex-row">
                        {item.deal_image_url && (
                          <div className="md:w-80 h-48 md:h-auto">
                            <img 
                              src={item.deal_image_url} 
                              alt={item.deal_title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <CardTitle className="text-xl mb-2">{item.deal_title}</CardTitle>
                              <div className="flex items-center text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="text-sm">{item.deal_destination}</span>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Badge variant="secondary">{item.deal_category}</Badge>
                                {item.deal_tags && item.deal_tags.length > 0 && (
                                  <div className="flex gap-2 ml-2">
                                    {item.deal_tags.slice(0, 2).map((tag, index) => (
                                      <Badge key={index} variant="outline">{tag}</Badge>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromWishlist(item.deal_id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex items-center">
                                <Euro className="w-5 h-5 text-primary mr-1" />
                                <span className="text-2xl font-bold text-primary">{item.deal_price}</span>
                                <span className="text-sm text-muted-foreground ml-1">{item.deal_currency}</span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                onClick={() => viewDeal(item.deal_id)}
                                className="bg-gradient-sunset hover:shadow-glow"
                              >
                                View Deal
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {wishlistItems.length > 0 && (
                <div className="mt-8 p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">💡 TravelAI Tip</h3>
                  <p className="text-muted-foreground">
                    Prices can fluctuate quickly. We recommend monitoring your favorite deals 
                    and booking as soon as the price is right. You'll receive alerts if prices drop!
                  </p>
                </div>
               )}
             </div>
           </div>
         </main>

         <Footer />
       </div>
     </>
   );
};

export default Wishlist;