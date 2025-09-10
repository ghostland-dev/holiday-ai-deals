import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plane, Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-sunset rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">TravelAI</h3>
                <p className="text-sm opacity-80">Smart Travel Deals</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Votre plateforme IA pour découvrir les meilleurs deals de voyage. 
              Nous scannons en temps réel les offres de Booking, SkyScanner et plus pour vous.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-white/10">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Recherche de Vols</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Réservation Hôtels</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Packs Vacances</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Location de Voitures</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Assurance Voyage</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Générateur IA</a></li>
            </ul>
          </div>

          {/* Destinations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Destinations Populaires</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Paris, France</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Maldives</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Bali, Indonésie</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Tokyo, Japon</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">New York, USA</a></li>
              <li><a href="#" className="opacity-90 hover:opacity-100 hover:underline transition-opacity">Dubaï, UAE</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 opacity-90">
                <Mail className="h-4 w-4" />
                <span>contact@travelai.fr</span>
              </div>
              <div className="flex items-center space-x-2 opacity-90">
                <Phone className="h-4 w-4" />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-start space-x-2 opacity-90">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Avenue des Champs-Élysées<br />75008 Paris, France</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm opacity-90">
            <p>&copy; 2024 TravelAI. Tous droits réservés.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:opacity-100 transition-opacity">Conditions d'utilisation</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Politique de confidentialité</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Cookies</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-xs opacity-80">
            <span>Partenaires:</span>
            <span className="font-medium">Booking.com</span>
            <span className="font-medium">SkyScanner</span>
            <span className="font-medium">Expedia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;