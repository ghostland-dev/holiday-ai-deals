import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Gift, TrendingUp, Zap, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Inscription réussie ! 🎉",
      description: "Vous recevrez nos meilleurs deals directement dans votre boîte mail.",
    });
    
    setEmail("");
    setIsSubscribing(false);
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Deals Exclusifs",
      description: "Accès prioritaire aux meilleures offres IA"
    },
    {
      icon: Zap,
      title: "Alertes Flash",
      description: "Notifications des deals à durée limitée"
    },
    {
      icon: Gift,
      title: "Bonus Membres",
      description: "Codes promo et offres réservées aux abonnés"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto overflow-hidden border-0 shadow-card">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left Side - Content */}
              <div className="p-8 lg:p-12">
                <div className="inline-flex items-center gap-2 bg-gradient-sunset px-3 py-1 rounded-full text-white text-sm font-medium mb-6">
                  <Mail className="w-4 h-4" />
                  Newsletter Exclusive
                </div>
                
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Ne Ratez Plus Aucun
                  <span className="block text-primary">Deal Exceptionnel</span>
                </h2>
                
                <p className="text-lg text-muted-foreground mb-6">
                  Rejoignez plus de <strong>50,000 voyageurs malins</strong> qui reçoivent 
                  nos deals IA personnalisés et économisent en moyenne <strong>35% sur leurs voyages</strong>.
                </p>

                {/* Benefits */}
                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Newsletter Form */}
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 h-12"
                      required
                    />
                    <Button 
                      type="submit"
                      disabled={isSubscribing}
                      className="bg-gradient-ocean hover:shadow-glow transition-all duration-300 h-12 px-8"
                    >
                      {isSubscribing ? (
                        <>
                          <Mail className="w-4 h-4 mr-2 animate-pulse" />
                          Inscription...
                        </>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 mr-2" />
                          S'abonner Gratuitement
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground flex items-center gap-2">
                    <Check className="w-3 h-3 text-green-500" />
                    Gratuit • Désabonnement en 1 clic • Pas de spam
                  </p>
                </form>
              </div>

              {/* Right Side - Visual */}
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 flex items-center justify-center">
                <div className="relative">
                  {/* Floating Cards */}
                  <div className="absolute -top-4 -left-4 transform rotate-12">
                    <Card className="w-48 p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-ocean rounded-full"></div>
                        <div>
                          <div className="h-2 bg-muted rounded w-16 mb-1"></div>
                          <div className="h-2 bg-muted rounded w-12"></div>
                        </div>
                      </div>
                    </Card>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 transform -rotate-12">
                    <Card className="w-48 p-4 shadow-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-sunset rounded-full"></div>
                        <div>
                          <div className="h-2 bg-muted rounded w-20 mb-1"></div>
                          <div className="h-2 bg-muted rounded w-16"></div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Main Card */}
                  <Card className="w-64 p-6 shadow-xl border-2 border-primary/20">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">Deal Alert!</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Maldives Resort -47%
                      </p>
                      <Badge className="bg-accent text-accent-foreground">
                        Seulement 899€
                      </Badge>
                    </div>
                  </Card>

                  {/* Decorative Elements */}
                  <div className="absolute top-8 right-8 w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  <div className="absolute bottom-8 left-8 w-3 h-3 bg-accent rounded-full animate-pulse delay-300"></div>
                  <div className="absolute top-16 left-16 w-2 h-2 bg-primary/50 rounded-full animate-pulse delay-700"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Proof */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">+2,300 inscrits cette semaine</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">€1.2M d'économies générées</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;