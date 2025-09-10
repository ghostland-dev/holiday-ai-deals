import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <>
      <SEOHead 
        title="À propos de TravelAI - Votre compagnon de voyage intelligent"
        description="Découvrez TravelAI, la plateforme révolutionnaire qui utilise l'IA pour vous offrir les meilleures offres de voyage personnalisées."
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 to-secondary/10 py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  À propos de TravelAI
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Nous révolutionnons la façon dont vous découvrez et réservez vos voyages grâce à l'intelligence artificielle.
                </p>
              </div>
            </div>
          </section>

          {/* Mission Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6 text-foreground">Notre Mission</h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      Chez TravelAI, nous croyons que chaque voyage devrait être une expérience unique et mémorable. 
                      Notre mission est de démocratiser l'accès aux meilleures offres de voyage en utilisant l'intelligence 
                      artificielle pour analyser des millions d'options et vous proposer celles qui correspondent parfaitement 
                      à vos besoins et votre budget.
                    </p>
                    <p className="text-lg text-muted-foreground">
                      Nous nous engageons à rendre la planification de voyage simple, personnalisée et accessible à tous.
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold mb-4 text-foreground">Nos Valeurs</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-muted-foreground">Innovation technologique</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-muted-foreground">Personnalisation avancée</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-muted-foreground">Transparence des prix</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span className="text-muted-foreground">Service client excellence</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Notre Équipe</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">SA</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Sophie Amélie</h3>
                    <p className="text-muted-foreground mb-2">CEO & Fondatrice</p>
                    <p className="text-sm text-muted-foreground">Experte en IA et passionnée de voyage</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-secondary to-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">MD</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Marc Dubois</h3>
                    <p className="text-muted-foreground mb-2">CTO</p>
                    <p className="text-sm text-muted-foreground">Architecte des systèmes d'IA</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">LM</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-foreground">Lucie Martin</h3>
                    <p className="text-muted-foreground mb-2">Head of Product</p>
                    <p className="text-sm text-muted-foreground">Spécialiste UX et industrie du voyage</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Notre Technologie</h2>
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-6 text-foreground">Intelligence Artificielle Avancée</h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Notre plateforme utilise des algorithmes d'apprentissage automatique sophistiqués pour analyser 
                      en temps réel des millions d'offres de voyage provenant de centaines de fournisseurs.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Analyse prédictive des prix</h4>
                          <p className="text-muted-foreground text-sm">Prédiction des fluctuations de prix pour vous alerter du meilleur moment pour réserver</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Recommandations personnalisées</h4>
                          <p className="text-muted-foreground text-sm">Suggestions adaptées à vos préférences et historique de voyage</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3 mt-1">
                          <span className="text-white text-xs">✓</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">Optimisation en temps réel</h4>
                          <p className="text-muted-foreground text-sm">Mise à jour continue des offres pour garantir les meilleurs prix</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-2xl">
                    <h4 className="text-xl font-bold mb-4 text-foreground">Nos Partenaires</h4>
                    <p className="text-muted-foreground mb-6">
                      Nous travaillons avec plus de 500 fournisseurs de voyage dans le monde entier pour vous garantir 
                      le plus large choix d'options.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div>• Compagnies aériennes</div>
                      <div>• Chaînes hôtelières</div>
                      <div>• Agences de voyage</div>
                      <div>• Plateformes de réservation</div>
                      <div>• Tours opérateurs</div>
                      <div>• Services locaux</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;