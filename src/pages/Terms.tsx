import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileText, DollarSign, Shield, AlertTriangle, Scale, Phone } from "lucide-react";

const Terms = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-sunset px-4 py-2 rounded-full text-white font-semibold mb-6">
          <FileText className="w-5 h-5" />
          Conditions Légales
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Conditions Générales
          <span className="block text-primary">d'Utilisation</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              1. Objet et Champ d'Application
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              TravelAI est une plateforme technologique qui utilise l'intelligence artificielle pour 
              comparer et recommander des offres de voyage provenant de différents fournisseurs 
              (Booking.com, SkyScanner, Expedia, etc.).
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Important :</strong> TravelAI agit en tant qu'intermédiaire et comparateur. 
                Les réservations sont effectuées directement auprès des fournisseurs partenaires.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              2. Modèle Économique et Commissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Gratuité pour les utilisateurs :</h4>
                <p className="text-muted-foreground">
                  L'utilisation de TravelAI est entièrement gratuite pour les utilisateurs finaux.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Rémunération par commissions :</h4>
                <p className="text-muted-foreground">
                  TravelAI perçoit des commissions de la part des partenaires (Booking, SkyScanner, etc.) 
                  lorsque vous effectuez une réservation via nos liens affiliés.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Transparence :</h4>
                <p className="text-muted-foreground">
                  Ces commissions n'augmentent jamais le prix que vous payez. Elles permettent de 
                  financer le développement et la maintenance de notre plateforme IA.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              3. Responsabilités et Garanties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-accent">Responsabilités de TravelAI :</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Fournir des informations exactes au moment de la recherche</li>
                  <li>Maintenir la sécurité et confidentialité de vos données</li>
                  <li>Assurer le bon fonctionnement de la plateforme IA</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-destructive">Limitations de responsabilité :</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>TravelAI n'est pas responsable des services fournis par les partenaires</li>
                  <li>Les prix peuvent varier entre la recherche et la réservation</li>
                  <li>Les conditions de voyage sont celles des fournisseurs finaux</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              4. Utilisation de l'IA et Données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Intelligence Artificielle :</h4>
                <p className="text-muted-foreground">
                  Notre IA Gemini analyse vos préférences pour personnaliser les recommandations. 
                  Les suggestions sont générées automatiquement et peuvent nécessiter une vérification.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Collecte de données :</h4>
                <p className="text-muted-foreground">
                  En utilisant TravelAI, vous consentez à la collecte et au traitement de vos données 
                  de navigation pour améliorer nos services. Voir notre Politique de Confidentialité.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              5. Propriété Intellectuelle
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Tous les éléments de la plateforme TravelAI (algorithmes IA, interface, logo, contenu) 
              sont protégés par le droit d'auteur et appartiennent à TravelAI SAS.
            </p>
            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm">
                L'utilisation commerciale ou la reproduction de nos algorithmes IA est strictement interdite 
                sans autorisation écrite préalable.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Modifications et Résiliation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Modifications des CGU :</h4>
                <p className="text-muted-foreground">
                  TravelAI se réserve le droit de modifier ces conditions. Les utilisateurs seront 
                  notifiés 30 jours avant l'entrée en vigueur.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Résiliation :</h4>
                <p className="text-muted-foreground">
                  Vous pouvez cesser d'utiliser TravelAI à tout moment. Nous pouvons suspendre 
                  l'accès en cas de violation des présentes conditions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              7. Droit Applicable et Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Droit applicable :</h4>
                <p className="text-muted-foreground">
                  Ces conditions sont régies par le droit français. Tout litige relève des 
                  tribunaux de Paris.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Contact :</h4>
                <div className="space-y-2 text-muted-foreground">
                  <p>TravelAI SAS</p>
                  <p>123 Avenue des Champs-Élysées, 75008 Paris</p>
                  <p>Email: legal@travelai.com</p>
                  <p>Téléphone: +33 1 23 45 67 89</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;