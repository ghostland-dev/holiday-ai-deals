import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Message envoyé !",
      description: "Nous vous répondrons dans les plus brefs délais.",
    });
    
    setFormData({ name: "", email: "", subject: "", category: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-ocean px-4 py-2 rounded-full text-white font-semibold mb-6">
          <MessageCircle className="w-5 h-5" />
          Support Client
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Contactez
          <span className="block text-primary">Notre Équipe</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Une question sur nos services IA ? Besoin d'aide pour votre réservation ? 
          Notre équipe d'experts voyage est là pour vous accompagner.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Informations de Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">support@travelai.com</p>
                  <p className="text-sm text-muted-foreground">Réponse sous 24h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Téléphone</h4>
                  <p className="text-muted-foreground">+33 1 23 45 67 89</p>
                  <p className="text-sm text-muted-foreground">Lun-Ven 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Adresse</h4>
                  <p className="text-muted-foreground">
                    123 Avenue des Champs-Élysées<br />
                    75008 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Horaires</h4>
                  <p className="text-muted-foreground">
                    Lundi - Vendredi: 9h - 18h<br />
                    Samedi: 10h - 16h<br />
                    Dimanche: Fermé
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Rapide */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Questions Fréquentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h5 className="font-medium mb-1">Comment fonctionne l'IA ?</h5>
                <p className="text-sm text-muted-foreground">
                  Notre IA Gemini analyse vos préférences en temps réel pour vous proposer les meilleurs deals.
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Les prix sont-ils garantis ?</h5>
                <p className="text-sm text-muted-foreground">
                  Les prix peuvent varier. Nous vous redirigeons vers nos partenaires pour la réservation finale.
                </p>
              </div>
              <div>
                <h5 className="font-medium mb-1">Service gratuit ?</h5>
                <p className="text-sm text-muted-foreground">
                  Oui, 100% gratuit ! Nous sommes rémunérés par nos partenaires via des commissions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Envoyez-nous un Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisissez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Question générale</SelectItem>
                        <SelectItem value="booking">Problème de réservation</SelectItem>
                        <SelectItem value="ai">IA et recommandations</SelectItem>
                        <SelectItem value="account">Compte utilisateur</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Sujet de votre message"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Décrivez votre demande en détail..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Emergency Support */}
      <div className="mt-16 text-center">
        <Card className="bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Support Urgence Voyage</h3>
            <p className="text-muted-foreground mb-6">
              En cas de problème urgent pendant votre voyage (annulation, modification, assistance)
            </p>
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <Phone className="w-5 h-5 mr-2" />
              Ligne d'Urgence 24/7
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;