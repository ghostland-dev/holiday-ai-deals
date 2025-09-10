import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Database, Users, Mail, Phone } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gradient-ocean px-4 py-2 rounded-full text-white font-semibold mb-6">
          <Shield className="w-5 h-5" />
          Protection des Données
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Politique de
          <span className="block text-primary">Confidentialité</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-primary" />
              1. Informations Collectées
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              TravelAI collecte les informations suivantes dans le cadre de nos services :
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Informations personnelles :</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Nom, prénom et adresse e-mail</li>
                  <li>Préférences de voyage et budget</li>
                  <li>Historique des recherches et réservations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Données techniques :</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Adresse IP et données de navigation</li>
                  <li>Type d'appareil et navigateur utilisé</li>
                  <li>Cookies et technologies similaires</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              2. Utilisation des Données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Nous utilisons vos données pour :
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Personnaliser les recommandations de voyage via notre IA</li>
              <li>Traiter vos réservations et transactions affiliées</li>
              <li>Améliorer nos services et algorithmes</li>
              <li>Vous envoyer des offres personnalisées (avec votre consentement)</li>
              <li>Assurer la sécurité et prévenir la fraude</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              3. Partage des Données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              TravelAI peut partager vos données avec :
            </p>
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Partenaires de voyage :</h4>
                <p className="text-muted-foreground">
                  Booking.com, SkyScanner, Expedia et autres fournisseurs pour finaliser vos réservations.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Prestataires techniques :</h4>
                <p className="text-muted-foreground">
                  Services d'hébergement, de paiement et d'analyse (Google Analytics, etc.).
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Obligations légales :</h4>
                <p className="text-muted-foreground">
                  Autorités compétentes en cas d'obligation légale ou réglementaire.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>4. Vos Droits</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Conformément au RGPD, vous disposez des droits suivants :
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Droit d'accès</h4>
                <p className="text-sm text-muted-foreground">
                  Obtenir une copie de vos données personnelles
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Droit de rectification</h4>
                <p className="text-sm text-muted-foreground">
                  Corriger vos données inexactes
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Droit à l'effacement</h4>
                <p className="text-sm text-muted-foreground">
                  Supprimer vos données personnelles
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Droit à la portabilité</h4>
                <p className="text-sm text-muted-foreground">
                  Récupérer vos données dans un format lisible
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Sécurité et Conservation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold">Sécurité :</h4>
                <p className="text-muted-foreground">
                  Chiffrement SSL/TLS, authentification à deux facteurs, audits de sécurité réguliers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold">Conservation :</h4>
                <p className="text-muted-foreground">
                  Vos données sont conservées 3 ans après votre dernière activité ou suppression sur demande.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              6. Contact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Pour toute question concernant cette politique ou exercer vos droits :
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>privacy@travelai.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;