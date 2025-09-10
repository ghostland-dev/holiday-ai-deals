import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { useState } from "react";
import heroImage from "@/assets/hero-travel-main.jpg";

const HeroSection = () => {
  const [searchData, setSearchData] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    guests: "1"
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-70" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Découvrez les
            <span className="block bg-gradient-sunset bg-clip-text text-transparent">
              Meilleurs Deals
            </span>
            de Voyage
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Notre IA trouve les meilleures offres sur Booking, SkyScanner et plus encore. 
            Des packs personnalisés pour des vacances inoubliables.
          </p>

          {/* Search Card */}
          <Card className="p-6 md:p-8 bg-white/95 backdrop-blur-sm shadow-glow max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Destination"
                  className="pl-10 h-12"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({...searchData, destination: e.target.value})}
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10 h-12"
                  value={searchData.checkin}
                  onChange={(e) => setSearchData({...searchData, checkin: e.target.value})}
                />
              </div>
              
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="date"
                  className="pl-10 h-12"
                  value={searchData.checkout}
                  onChange={(e) => setSearchData({...searchData, checkout: e.target.value})}
                />
              </div>
              
              <div className="relative">
                <Users className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Voyageurs"
                  className="pl-10 h-12"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({...searchData, guests: e.target.value})}
                />
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full md:w-auto px-12 h-14 text-lg font-semibold bg-gradient-sunset hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              <Search className="mr-2 h-5 w-5" />
              Rechercher les Meilleurs Deals
            </Button>
          </Card>

          {/* Trust indicators */}
          <div className="mt-12 text-white/80">
            <p className="text-sm mb-4">Connecté aux meilleurs fournisseurs</p>
            <div className="flex flex-wrap justify-center gap-8 items-center opacity-80">
              <span className="font-semibold text-lg">Booking.com</span>
              <span className="font-semibold text-lg">SkyScanner</span>
              <span className="font-semibold text-lg">Expedia</span>
              <span className="font-semibold text-lg">Agoda</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;