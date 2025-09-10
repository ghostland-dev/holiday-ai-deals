import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Send, CheckCircle, Gift } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('newsletter-subscribe', {
        body: { email, preferences: ['deals', 'tips'] }
      });

      if (error) throw error;

      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Inscription réussie !",
        description: "Vous recevrez nos meilleures offres par email.",
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Erreur d'inscription",
        description: "Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-sunset bg-clip-text text-transparent">
              Newsletter Exclusive
            </span>
            <br />
            <span className="text-foreground">Deals & Conseils IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Rejoignez +15,000 voyageurs qui économisent en moyenne 35% grâce à nos alertes IA personnalisées
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Benefits */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-ocean rounded-lg">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Deals Exclusifs</h3>
                  <p className="text-muted-foreground">
                    Accès prioritaire aux offres négociées par notre IA, jusqu'à -70% sur les prix publics
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-sunset rounded-lg">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Alertes Personnalisées</h3>
                  <p className="text-muted-foreground">
                    Recevez uniquement les deals qui correspondent à vos préférences de voyage
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Conseils d'Experts</h3>
                  <p className="text-muted-foreground">
                    Tips exclusifs pour optimiser vos réservations et éviter les pièges
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <Card className="p-8 shadow-card">
              <CardContent className="space-y-6">
                {isSubscribed ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-green-600">
                      Inscription Confirmée !
                    </h3>
                    <p className="text-muted-foreground">
                      Vous recevrez votre premier deal personnalisé dans les prochaines heures
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2">
                        Recevez nos Meilleurs Deals
                      </h3>
                      <p className="text-muted-foreground">
                        100% gratuit • Désabonnement en 1 clic
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 text-lg"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        size="lg" 
                        disabled={loading}
                        className="w-full bg-gradient-sunset hover:shadow-glow transition-all duration-300"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {loading ? "Inscription..." : "S'inscrire Gratuitement"}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;