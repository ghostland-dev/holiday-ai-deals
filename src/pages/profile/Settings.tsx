import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Camera, Save, User, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const ProfileSettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Mock user data - in real app, fetch from API
  const [profileData, setProfileData] = useState({
    firstName: "Marie",
    lastName: "Dubois",
    email: user?.email || "",
    phone: "+33 6 12 34 56 78",
    dateOfBirth: "1990-05-15",
    gender: "female",
    address: {
      street: "123 Rue de Rivoli",
      city: "Paris",
      postalCode: "75001",
      country: "France"
    },
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  });

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev] as any,
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would make actual API call to update profile
      // await updateProfile(profileData);
      
      toast.success("Profil mis à jour avec succès");
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = () => {
    // In real app, implement image upload
    toast.info("Fonctionnalité de changement d'avatar à venir");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Paramètres du Profil - TravelAI"
        description="Gérez vos informations personnelles et paramètres de compte"
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8">
                <Button
                  variant="ghost"
                  onClick={() => navigate("/profile")}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au profil
                </Button>
                <h1 className="text-3xl font-bold">Paramètres du profil</h1>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Avatar Section */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Photo de profil
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <div className="relative inline-block">
                        <Avatar className="w-32 h-32 mx-auto">
                          <AvatarImage src={profileData.avatar} />
                          <AvatarFallback className="text-2xl">
                            {profileData.firstName[0]}{profileData.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0"
                          onClick={handleAvatarChange}
                        >
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      <div>
                        <h3 className="font-semibold">{profileData.firstName} {profileData.lastName}</h3>
                        <p className="text-sm text-muted-foreground">{profileData.email}</p>
                      </div>
                      <Button variant="outline" onClick={handleAvatarChange}>
                        Changer la photo
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Form Section */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Personal Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Prénom</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Nom de famille</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Adresse e-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date de naissance</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={profileData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Genre</Label>
                        <Select 
                          value={profileData.gender} 
                          onValueChange={(value) => handleInputChange('gender', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Homme</SelectItem>
                            <SelectItem value="female">Femme</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                            <SelectItem value="prefer-not-to-say">Préfère ne pas dire</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Address Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2" />
                        Adresse
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Adresse</Label>
                        <Input
                          id="street"
                          value={profileData.address.street}
                          onChange={(e) => handleInputChange('address.street', e.target.value)}
                        />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">Ville</Label>
                          <Input
                            id="city"
                            value={profileData.address.city}
                            onChange={(e) => handleInputChange('address.city', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Code postal</Label>
                          <Input
                            id="postalCode"
                            value={profileData.address.postalCode}
                            onChange={(e) => handleInputChange('address.postalCode', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Pays</Label>
                          <Select 
                            value={profileData.address.country}
                            onValueChange={(value) => handleInputChange('address.country', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="France">France</SelectItem>
                              <SelectItem value="Belgium">Belgique</SelectItem>
                              <SelectItem value="Switzerland">Suisse</SelectItem>
                              <SelectItem value="Canada">Canada</SelectItem>
                              <SelectItem value="Other">Autre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Preferences */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Préférences de contact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <Mail className="w-5 h-5 mr-3 text-primary" />
                            <div>
                              <h4 className="font-medium">Notifications par e-mail</h4>
                              <p className="text-sm text-muted-foreground">Recevoir les offres et mises à jour</p>
                            </div>
                          </div>
                          <input type="checkbox" defaultChecked className="rounded" />
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <Phone className="w-5 h-5 mr-3 text-primary" />
                            <div>
                              <h4 className="font-medium">Notifications SMS</h4>
                              <p className="text-sm text-muted-foreground">Alertes importantes uniquement</p>
                            </div>
                          </div>
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <Button 
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? "Sauvegarde..." : "Sauvegarder les modifications"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/profile")}
                    >
                      Annuler
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProfileSettings;