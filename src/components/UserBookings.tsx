import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, ExternalLink, AlertCircle, CheckCircle, Clock, X } from "lucide-react";
import { useAuthContext } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  user_id: string;
  deal_id: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  total_price: number;
  currency: string;
  booking_details: Record<string, any>;
  external_booking_id?: string;
  created_at: string;
  updated_at: string;
  // Deal info from join
  deal?: {
    id: string;
    title: string;
    description: string;
    destination: string;
    provider: string;
    category: string;
    image_url?: string;
  };
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "En attente",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    variant: "secondary" as const
  },
  confirmed: {
    icon: CheckCircle,
    label: "Confirmée",
    color: "bg-green-100 text-green-800 border-green-200",
    variant: "default" as const
  },
  cancelled: {
    icon: X,
    label: "Annulée",
    color: "bg-red-100 text-red-800 border-red-200",
    variant: "destructive" as const
  },
  completed: {
    icon: CheckCircle,
    label: "Terminée",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    variant: "secondary" as const
  }
};

const UserBookings = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          deal:deals(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setBookings((data || []) as Booking[]);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Impossible de charger vos réservations');
      toast({
        title: "Erreur",
        description: "Impossible de charger vos réservations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId)
        .eq('user_id', user?.id);

      if (error) throw error;

      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès"
      });

      fetchBookings(); // Refresh data
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler la réservation",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
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
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Erreur de chargement</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchBookings} variant="outline">
          Réessayer
        </Button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Aucune réservation</h3>
        <p className="text-muted-foreground mb-4">
          Vous n'avez pas encore effectué de réservation. Découvrez nos offres exclusives !
        </p>
        <Button asChild>
          <a href="/#deals">Voir les offres</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mes Réservations</h1>
        <Badge variant="outline">
          {bookings.length} réservation{bookings.length > 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => {
          const status = statusConfig[booking.status];
          const StatusIcon = status.icon;

          return (
            <Card key={booking.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">
                      {booking.deal?.title || 'Offre supprimée'}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {booking.deal?.destination || 'Destination inconnue'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Réservé le {formatDate(booking.created_at)}
                      </div>
                    </div>
                  </div>
                  <Badge variant={status.variant} className="flex items-center gap-1">
                    <StatusIcon className="w-3 h-3" />
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Détails de la réservation</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div>ID: {booking.id.slice(0, 8)}...</div>
                      <div>Fournisseur: {booking.deal?.provider || 'N/A'}</div>
                      <div>Catégorie: {booking.deal?.category || 'N/A'}</div>
                      {booking.external_booking_id && (
                        <div>Référence externe: {booking.external_booking_id}</div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2">Prix</h4>
                    <div className="text-2xl font-bold text-primary">
                      {booking.total_price}€
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {booking.currency.toUpperCase()}
                    </div>
                  </div>
                </div>

                {booking.deal?.description && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-sm mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {booking.deal.description}
                      </p>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Dernière mise à jour: {formatDate(booking.updated_at)}
                  </div>

                  <div className="flex gap-2">
                    {booking.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Annuler
                      </Button>
                    )}
                    
                    {booking.external_booking_id && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <a 
                          href={`#booking-${booking.external_booking_id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Voir chez le fournisseur
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default UserBookings;