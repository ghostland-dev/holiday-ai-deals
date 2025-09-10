import { Button } from "@/components/ui/button";
import { Plane, Menu, Sparkles } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-ocean rounded-lg">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">TravelAI</h1>
              <p className="text-xs text-muted-foreground">Smart Travel Deals</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#deals" className="text-foreground hover:text-primary transition-colors font-medium">
              Deals
            </a>
            <a href="#ai-packs" className="text-foreground hover:text-primary transition-colors font-medium">
              Packs IA
            </a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium">
              Destinations
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              À Propos
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm">
              Connexion
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-sunset hover:shadow-glow transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 mr-1" />
              Générer un Pack
            </Button>
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-3">
              <a href="#deals" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Deals
              </a>
              <a href="#ai-packs" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Packs IA
              </a>
              <a href="#destinations" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Destinations
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                À Propos
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-sunset hover:shadow-glow transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Générer un Pack
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;