import DealsGrid from "./DealsGrid";
import { Button } from "@/components/ui/button";

const DealsSection = () => {

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Deals Exclusifs
            <span className="block text-accent">Disponibles Maintenant</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nos algorithmes IA scannent en temps réel pour vous trouver les meilleures offres. 
            Réservez avant qu'elles ne disparaissent !
          </p>
        </div>

        <DealsGrid />

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline" 
            className="px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Voir Plus de Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;