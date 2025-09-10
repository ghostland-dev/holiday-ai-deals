import { Button } from "@/components/ui/button";
import { Plane, Menu, Sparkles, User, LogOut } from "lucide-react";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useAuthContext } from "./AuthProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, signOut } = useAuthContext();

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
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </a>
            <a href="/destinations" className="text-muted-foreground hover:text-foreground transition-colors">
              Destinations
            </a>
            <a href="/wishlist" className="text-muted-foreground hover:text-foreground transition-colors">
              Favoris
            </a>
            <a href="/reviews" className="text-muted-foreground hover:text-foreground transition-colors">
              Avis
            </a>
            <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              À propos
            </a>
            <a href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.email}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={signOut}
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  size="sm" 
                  className="bg-gradient-sunset hover:shadow-glow transition-all duration-300"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Générer un Pack
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Connexion
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-sunset hover:shadow-glow transition-all duration-300"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Générer un Pack
                </Button>
              </>
            )}
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
              <a href="/" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Accueil
              </a>
              <a href="/destinations" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Destinations
              </a>
              <a href="/wishlist" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Favoris
              </a>
              <a href="/reviews" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                Avis
              </a>
              <a href="/about" className="text-foreground hover:text-primary transition-colors font-medium py-2">
                À Propos
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <div className="flex items-center justify-between p-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-medium">{user.email}</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={signOut}
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-sunset hover:shadow-glow transition-all duration-300"
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      Générer un Pack
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      Connexion
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-gradient-sunset hover:shadow-glow transition-all duration-300"
                      onClick={() => setIsAuthModalOpen(true)}
                    >
                      <Sparkles className="w-4 h-4 mr-1" />
                      Générer un Pack
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          setIsAuthModalOpen(false);
        }}
      />
    </header>
  );
};

export default Header;