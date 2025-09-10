import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Plane, 
  Heart,
  RefreshCw,
  AlertCircle,
  Wifi,
  Calendar
} from "lucide-react";

interface EmptyStateProps {
  type: 'no-results' | 'no-favorites' | 'no-trips' | 'error' | 'offline' | 'loading';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  showIcon?: boolean;
}

const EmptyState = ({
  type,
  title,
  description,
  actionLabel,
  onAction,
  showIcon = true
}: EmptyStateProps) => {
  const getConfig = () => {
    switch (type) {
      case 'no-results':
        return {
          icon: Search,
          defaultTitle: "Aucun résultat trouvé",
          defaultDescription: "Essayez de modifier vos critères de recherche ou explorez nos destinations populaires.",
          defaultActionLabel: "Voir les destinations populaires",
          bgColor: "bg-blue-500/10",
          iconColor: "text-blue-600"
        };
      
      case 'no-favorites':
        return {
          icon: Heart,
          defaultTitle: "Aucun favori pour le moment",
          defaultDescription: "Explorez nos deals et destinations pour commencer à créer votre liste de souhaits voyage.",
          defaultActionLabel: "Découvrir les deals",
          bgColor: "bg-red-500/10", 
          iconColor: "text-red-600"
        };

      case 'no-trips':
        return {
          icon: Calendar,
          defaultTitle: "Aucun voyage planifié",
          defaultDescription: "Commencez à planifier votre prochaine aventure avec nos packs IA personnalisés.",
          defaultActionLabel: "Générer un pack IA",
          bgColor: "bg-green-500/10",
          iconColor: "text-green-600"
        };

      case 'error':
        return {
          icon: AlertCircle,
          defaultTitle: "Une erreur s'est produite",
          defaultDescription: "Nous rencontrons un problème temporaire. Veuillez réessayer dans quelques instants.",
          defaultActionLabel: "Réessayer",
          bgColor: "bg-red-500/10",
          iconColor: "text-red-600"
        };

      case 'offline':
        return {
          icon: Wifi,
          defaultTitle: "Vous êtes hors ligne",
          defaultDescription: "Vérifiez votre connexion internet pour accéder aux derniers deals et informations.",
          defaultActionLabel: "Réessayer",
          bgColor: "bg-gray-500/10",
          iconColor: "text-gray-600"
        };

      case 'loading':
        return {
          icon: RefreshCw,
          defaultTitle: "Chargement en cours...",
          defaultDescription: "Nous recherchons les meilleures offres pour vous.",
          defaultActionLabel: "",
          bgColor: "bg-blue-500/10",
          iconColor: "text-blue-600 animate-spin"
        };

      default:
        return {
          icon: MapPin,
          defaultTitle: "Aucun élément",
          defaultDescription: "Il n'y a rien à afficher pour le moment.",
          defaultActionLabel: "Actualiser",
          bgColor: "bg-gray-500/10",
          iconColor: "text-gray-600"
        };
    }
  };

  const config = getConfig();
  const Icon = config.icon;

  const finalTitle = title || config.defaultTitle;
  const finalDescription = description || config.defaultDescription;
  const finalActionLabel = actionLabel || config.defaultActionLabel;

  return (
    <Card className="border-dashed border-2 border-muted-foreground/20">
      <CardContent className="flex flex-col items-center justify-center text-center p-12">
        {showIcon && (
          <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center mb-6`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>
        )}

        <h3 className="text-xl font-semibold mb-3">
          {finalTitle}
        </h3>

        <p className="text-muted-foreground max-w-md leading-relaxed mb-6">
          {finalDescription}
        </p>

        {finalActionLabel && onAction && type !== 'loading' && (
          <Button 
            onClick={onAction}
            className="bg-gradient-ocean hover:shadow-glow transition-all duration-300"
          >
            {type === 'error' || type === 'offline' ? (
              <RefreshCw className="w-4 h-4 mr-2" />
            ) : type === 'no-trips' ? (
              <Plane className="w-4 h-4 mr-2" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            {finalActionLabel}
          </Button>
        )}

        {type === 'loading' && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
            Recherche en cours...
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Specialized components for common use cases
export const NoSearchResults = (props: Partial<EmptyStateProps>) => (
  <EmptyState type="no-results" {...props} />
);

export const NoFavorites = (props: Partial<EmptyStateProps>) => (
  <EmptyState type="no-favorites" {...props} />
);

export const NoTrips = (props: Partial<EmptyStateProps>) => (
  <EmptyState type="no-trips" {...props} />
);

export const ErrorState = (props: Partial<EmptyStateProps>) => (
  <EmptyState type="error" {...props} />
);

export const OfflineState = (props: Partial<EmptyStateProps>) => (
  <EmptyState type="offline" {...props} />
);

export const LoadingState = (props: Partial<EmptyStateProps>) => (
  <EmptyState type="loading" {...props} />
);

export default EmptyState;