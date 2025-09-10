import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Clock } from "lucide-react";

const faqData = [
  {
    category: "Réservations",
    questions: [
      {
        question: "Comment puis-je réserver un voyage sur TravelAI ?",
        answer: "Pour réserver un voyage, recherchez votre destination souhaitée, sélectionnez l'offre qui vous convient, puis suivez les étapes de réservation. Vous devrez créer un compte ou vous connecter, renseigner les informations des voyageurs et procéder au paiement sécurisé."
      },
      {
        question: "Puis-je modifier ou annuler ma réservation ?",
        answer: "Les conditions de modification et d'annulation dépendent de l'offre choisie et du fournisseur. Ces informations sont clairement indiquées lors de la réservation et dans votre confirmation de commande. Vous pouvez gérer vos réservations depuis votre espace client."
      },
      {
        question: "Quand vais-je recevoir ma confirmation de réservation ?",
        answer: "Votre confirmation de réservation est envoyée immédiatement après le paiement par e-mail. Si vous ne la recevez pas dans les 15 minutes, vérifiez vos spams ou contactez notre service client."
      }
    ]
  },
  {
    category: "Paiements",
    questions: [
      {
        question: "Quels moyens de paiement acceptez-vous ?",
        answer: "Nous acceptons les cartes de crédit principales (Visa, MasterCard, American Express), PayPal, et les virements bancaires. Tous les paiements sont sécurisés par un cryptage SSL."
      },
      {
        question: "Mes données bancaires sont-elles sécurisées ?",
        answer: "Absolument. Nous utilisons les technologies de sécurité les plus avancées et nous ne stockons jamais vos informations bancaires complètes. Tous les paiements sont traités par des partenaires certifiés PCI DSS."
      },
      {
        question: "Puis-je payer en plusieurs fois ?",
        answer: "Selon l'offre, le paiement en plusieurs fois peut être disponible. Cette option est indiquée lors du processus de réservation. Des frais supplémentaires peuvent s'appliquer."
      }
    ]
  },
  {
    category: "Intelligence Artificielle",
    questions: [
      {
        question: "Comment l'IA de TravelAI fonctionne-t-elle ?",
        answer: "Notre IA analyse en temps réel des millions d'offres de voyage, vos préférences, votre historique et les tendances du marché pour vous proposer les meilleures offres personnalisées. Elle apprend de vos interactions pour améliorer constamment ses recommandations."
      },
      {
        question: "Mes données personnelles sont-elles utilisées par l'IA ?",
        answer: "Nous utilisons uniquement les données que vous nous fournissez volontairement (préférences de voyage, budget, destinations favorites) pour personnaliser nos recommandations. Vos données sont protégées selon le RGPD et ne sont jamais vendues à des tiers."
      },
      {
        question: "Comment l'IA prédit-elle les fluctuations de prix ?",
        answer: "Notre IA analyse l'historique des prix, la saisonnalité, les événements spéciaux, la demande en temps réel et de nombreux autres facteurs pour prédire les tendances de prix et vous alerter au meilleur moment pour réserver."
      }
    ]
  },
  {
    category: "Compte et Profil",
    questions: [
      {
        question: "Comment créer un compte TravelAI ?",
        answer: "Cliquez sur 'S'inscrire' en haut de la page, renseignez votre email et créez un mot de passe sécurisé. Vous recevrez un e-mail de confirmation pour activer votre compte."
      },
      {
        question: "J'ai oublié mon mot de passe, que faire ?",
        answer: "Sur la page de connexion, cliquez sur 'Mot de passe oublié' et saisissez votre email. Vous recevrez un lien pour réinitialiser votre mot de passe."
      },
      {
        question: "Comment supprimer mon compte ?",
        answer: "Vous pouvez supprimer votre compte depuis les paramètres de votre profil. Attention, cette action est définitive et supprimera toutes vos données et réservations."
      }
    ]
  },
  {
    category: "Voyages",
    questions: [
      {
        question: "Que faire si j'ai un problème pendant mon voyage ?",
        answer: "Notre service client 24h/7j est disponible pour vous aider pendant votre voyage. Contactez-nous via le chat, email ou téléphone. Nous avons également des partenaires locaux dans de nombreuses destinations."
      },
      {
        question: "Fournissez-vous des assurances voyage ?",
        answer: "Nous proposons différentes options d'assurance voyage lors de votre réservation, couvrant l'annulation, les frais médicaux, les bagages et plus encore. Les conditions varient selon l'assureur."
      },
      {
        question: "Comment obtenir mes billets et vouchers ?",
        answer: "Vos billets électroniques et vouchers sont disponibles dans votre espace client dès la confirmation de réservation. Vous les recevrez également par email. Assurez-vous de les imprimer ou de les avoir sur votre téléphone."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <>
      <SEOHead 
        title="FAQ - Questions Fréquentes | TravelAI"
        description="Trouvez rapidement les réponses à vos questions sur TravelAI : réservations, paiements, IA, compte et voyages."
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Questions Fréquentes
                </h1>
                <p className="text-xl text-muted-foreground">
                  Trouvez rapidement les réponses à vos questions les plus courantes
                </p>
              </div>

              {/* FAQ Sections */}
              <div className="space-y-8">
                {faqData.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="text-2xl text-primary">
                        {category.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.questions.map((faq, questionIndex) => (
                          <AccordionItem 
                            key={questionIndex} 
                            value={`${categoryIndex}-${questionIndex}`}
                            className="border border-border rounded-lg px-4"
                          >
                            <AccordionTrigger className="text-left font-medium hover:no-underline">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Support Section */}
              <div className="mt-16">
                <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl mb-2">
                      Vous ne trouvez pas la réponse à votre question ?
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Notre équipe de support est là pour vous aider
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-background rounded-lg border">
                        <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Chat en Direct</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          Réponse immédiate de nos agents
                        </p>
                        <Button variant="outline" size="sm">
                          Démarrer le chat
                        </Button>
                      </div>
                      
                      <div className="text-center p-6 bg-background rounded-lg border">
                        <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Email</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          support@travelai.com
                        </p>
                        <Button variant="outline" size="sm">
                          Nous contacter
                        </Button>
                      </div>
                      
                      <div className="text-center p-6 bg-background rounded-lg border">
                        <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
                        <h4 className="font-semibold mb-2">Téléphone</h4>
                        <p className="text-sm text-muted-foreground mb-4">
                          +33 1 23 45 67 89
                        </p>
                        <Button variant="outline" size="sm">
                          Appeler
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary mr-2" />
                      <span className="text-sm text-muted-foreground">
                        Support disponible 24h/7j - Temps de réponse moyen : 2 minutes
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FAQ;