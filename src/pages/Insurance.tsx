import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, CheckCircle, XCircle, Plane, Heart, 
  Umbrella, Car, Camera, Briefcase, Globe,
  Phone, Mail, Clock, Star, AlertTriangle
} from "lucide-react";

const Insurance = () => {
  const [selectedPlan, setSelectedPlan] = useState("essential");

  const insurancePlans = [
    {
      id: "essential",
      name: "Essentiel",
      price: 29,
      popular: false,
      description: "Protection de base pour vos voyages",
      features: [
        { included: true, text: "Frais médicaux jusqu'à 100 000€" },
        { included: true, text: "Rapatriement médical" },
        { included: true, text: "Annulation voyage jusqu'à 5 000€" },
        { included: true, text: "Retard de vol jusqu'à 300€" },
        { included: false, text: "Sports d'hiver" },
        { included: false, text: "Bagages et effets personnels" },
        { included: false, text: "Responsabilité civile" }
      ]
    },
    {
      id: "premium", 
      name: "Premium",
      price: 59,
      popular: true,
      description: "Protection complète recommandée",
      features: [
        { included: true, text: "Frais médicaux jusqu'à 500 000€" },
        { included: true, text: "Rapatriement médical" },
        { included: true, text: "Annulation voyage jusqu'à 15 000€" },
        { included: true, text: "Retard de vol jusqu'à 800€" },
        { included: true, text: "Sports d'hiver inclus" },
        { included: true, text: "Bagages jusqu'à 2 500€" },
        { included: true, text: "Responsabilité civile 1M€" }
      ]
    },
    {
      id: "platinum",
      name: "Platinum", 
      price: 99,
      popular: false,
      description: "Protection maximale tous risques",
      features: [
        { included: true, text: "Frais médicaux illimités" },
        { included: true, text: "Rapatriement médical premium" },
        { included: true, text: "Annulation voyage jusqu'à 50 000€" },
        { included: true, text: "Retard de vol jusqu'à 1 500€" },
        { included: true, text: "Sports extrêmes inclus" },
        { included: true, text: "Bagages jusqu'à 5 000€" },
        { included: true, text: "Responsabilité civile 2M€" }
      ]
    }
  ];

  const coverageTypes = [
    {
      icon: Heart,
      title: "Frais médicaux",
      description: "Couverture des frais de santé à l'étranger",
      details: [
        "Consultation médicale d'urgence",
        "Hospitalisation",
        "Médicaments prescrits",
        "Soins dentaires d'urgence"
      ]
    },
    {
      icon: Plane,
      title: "Transport et rapatriement",
      description: "Rapatriement médical et transport sanitaire",
      details: [
        "Rapatriement médical",
        "Transport du corps en cas de décès",
        "Présence d'un proche en cas d'hospitalisation",
        "Retour anticipé pour décès d'un proche"
      ]
    },
    {
      icon: XCircle,
      title: "Annulation voyage",
      description: "Remboursement en cas d'annulation",
      details: [
        "Maladie grave de l'assuré",
        "Décès d'un proche",
        "Licenciement économique",
        "Conditions météorologiques"
      ]
    },
    {
      icon: Clock,
      title: "Retard et interruption",
      description: "Compensation pour les désagréments de voyage",
      details: [
        "Retard d'avion ou de train",
        "Perte de correspondance",
        "Interruption de voyage",
        "Frais d'hébergement supplémentaires"
      ]
    },
    {
      icon: Camera,
      title: "Bagages et effets personnels",
      description: "Protection de vos affaires personnelles",
      details: [
        "Vol ou perte de bagages",
        "Dommages aux bagages",
        "Retard de bagages",
        "Objets de valeur spéciaux"
      ]
    },
    {
      icon: Shield,
      title: "Responsabilité civile",
      description: "Couverture des dommages causés à autrui",
      details: [
        "Dommages corporels",
        "Dommages matériels",
        "Protection juridique",
        "Assistance en cas de litige"
      ]
    }
  ];

  const testimonials = [
    {
      id: "1",
      name: "Sophie M.",
      location: "Paris",
      rating: 5,
      text: "Excellent service ! J'ai eu besoin d'une prise en charge médicale au Japon, tout s'est passé parfaitement. Remboursement rapide.",
      trip: "Tokyo, Japon"
    },
    {
      id: "2", 
      name: "Marc D.",
      location: "Lyon",
      rating: 5,
      text: "Mon vol a été annulé à cause d'une grève, j'ai été remboursé intégralement en 48h. Service client très réactif.",
      trip: "New York, USA"
    },
    {
      id: "3",
      name: "Claire L.",
      location: "Marseille",
      rating: 4,
      text: "Bagages perdus pendant 3 jours à Bali. L'assurance a couvert tous mes achats de première nécessité. Très satisfaite !",
      trip: "Bali, Indonésie"
    }
  ];

  return (
    <>
      <SEOHead 
        title="Assurance Voyage - TravelAI"
        description="Protégez votre voyage avec nos assurances complètes. Frais médicaux, annulation, bagages et plus."
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Assurance Voyage
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Voyagez l'esprit tranquille avec nos assurances complètes
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span>Couverture mondiale</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span>Assistance 24h/7j</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-1" />
                    <span>Remboursement rapide</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="container mx-auto px-4 mt-12">
            
            {/* Insurance Plans */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Choisissez votre protection</h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {insurancePlans.map((plan) => (
                  <Card 
                    key={plan.id}
                    className={`relative cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan.id 
                        ? 'border-primary shadow-xl scale-105' 
                        : 'hover:shadow-lg'
                    } ${plan.popular ? 'border-2 border-primary' : ''}`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-primary to-secondary px-4 py-1">
                          <Star className="w-3 h-3 mr-1" />
                          Recommandé
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-primary">€{plan.price}</span>
                        <span className="text-muted-foreground">/voyage</span>
                      </div>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                          )}
                          <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground line-through'}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                      
                      <Button 
                        className={`w-full mt-6 ${
                          selectedPlan === plan.id 
                            ? 'bg-gradient-to-r from-primary to-secondary' 
                            : ''
                        }`}
                        variant={selectedPlan === plan.id ? "default" : "outline"}
                      >
                        {selectedPlan === plan.id ? "Sélectionné" : "Choisir ce plan"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Coverage Details */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Types de couverture</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coverageTypes.map((coverage, index) => {
                  const Icon = coverage.icon;
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl">{coverage.title}</CardTitle>
                        <p className="text-muted-foreground">{coverage.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {coverage.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start text-sm">
                              <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* FAQ and Information */}
            <section className="mb-16">
              <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                  <TabsTrigger value="process">Processus de réclamation</TabsTrigger>
                  <TabsTrigger value="testimonials">Témoignages</TabsTrigger>
                </TabsList>
                
                <TabsContent value="faq" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Questions fréquentes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-medium mb-2">Quand dois-je souscrire une assurance voyage ?</h4>
                        <p className="text-muted-foreground text-sm">
                          Idéalement dans les 15 jours suivant votre réservation pour bénéficier de toutes les garanties, 
                          notamment l'annulation pour motif médical préexistant.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">L'assurance couvre-t-elle les sports d'hiver ?</h4>
                        <p className="text-muted-foreground text-sm">
                          Les plans Premium et Platinum incluent automatiquement les sports d'hiver. 
                          Pour le plan Essentiel, vous pouvez ajouter cette option.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Comment faire une réclamation ?</h4>
                        <p className="text-muted-foreground text-sm">
                          Contactez notre assistance 24h/7j au +33 1 23 45 67 89 ou via notre app mobile. 
                          Conservez tous les justificatifs (factures, certificats médicaux, etc.).
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="process">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comment faire une réclamation ?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">1</div>
                          <div>
                            <h4 className="font-medium">Contactez-nous immédiatement</h4>
                            <p className="text-muted-foreground text-sm">
                              Appelez notre assistance 24h/7j au +33 1 23 45 67 89 dès que possible
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">2</div>
                          <div>
                            <h4 className="font-medium">Conservez tous les documents</h4>
                            <p className="text-muted-foreground text-sm">
                              Gardez factures, certificats médicaux, rapports de police, etc.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">3</div>
                          <div>
                            <h4 className="font-medium">Déclarez votre sinistre</h4>
                            <p className="text-muted-foreground text-sm">
                              Remplissez le formulaire en ligne ou via notre app mobile
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">4</div>
                          <div>
                            <h4 className="font-medium">Recevez votre remboursement</h4>
                            <p className="text-muted-foreground text-sm">
                              Traitement sous 48h et remboursement sous 5 jours ouvrés
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="testimonials">
                  <div className="space-y-6">
                    {testimonials.map((testimonial) => (
                      <Card key={testimonial.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                              <span className="font-bold text-primary">
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-medium">{testimonial.name}</h4>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{testimonial.location}</span>
                                <div className="flex">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-muted-foreground mb-2">{testimonial.text}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Globe className="w-3 h-3 mr-1" />
                                <span>Voyage: {testimonial.trip}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Contact and Support */}
            <section className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Assistance 24h/7j</h2>
                <p className="text-muted-foreground">
                  Notre équipe d'assistance est disponible partout dans le monde, 24h sur 24
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium mb-2">Urgence médicale</h4>
                  <p className="text-primary font-bold">+33 1 23 45 67 89</p>
                  <p className="text-sm text-muted-foreground">Appel gratuit 24h/7j</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium mb-2">Support général</h4>
                  <p className="text-primary font-bold">assurance@travelai.fr</p>
                  <p className="text-sm text-muted-foreground">Réponse sous 2h</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6" />
                  </div>
                  <h4 className="font-medium mb-2">App mobile</h4>
                  <p className="text-primary font-bold">TravelAI Insurance</p>
                  <p className="text-sm text-muted-foreground">Disponible iOS & Android</p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <Card className="max-w-2xl mx-auto">
                <CardContent className="pt-8">
                  <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Prêt à partir protégé ?</h3>
                  <p className="text-muted-foreground mb-6">
                    Souscrivez votre assurance voyage en 2 minutes et partez l'esprit tranquille
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-secondary">
                      Souscrire maintenant
                    </Button>
                    <Button variant="outline" size="lg">
                      Demander un devis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Insurance;