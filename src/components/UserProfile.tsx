import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, MapPin, Save, Camera } from "lucide-react";
import { useAuthContext } from "./AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  id: string;
  user_id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  preferences: any;
  created_at: string;
  updated_at: string;
}

const UserProfile = () => {
  const { user } = useAuthContext();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    preferences: {
      destinations: [] as string[],
      budget_range: "",
      travel_style: "",
      notifications: true
    }
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          preferences: (data.preferences as any) || {
            destinations: [],
            budget_range: "",
            travel_style: "",
            notifications: true
          }
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger votre profil",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          email: user.email!,
          first_name: formData.first_name,
          last_name: formData.last_name,
          preferences: formData.preferences,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été sauvegardées avec succès"
      });

      fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder votre profil",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getUserInitials = () => {
    if (formData.first_name && formData.last_name) {
      return `${formData.first_name[0]}${formData.last_name[0]}`.toUpperCase();
    }
    return user?.email?.[0].toUpperCase() || 'U';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
        <Card>
          <CardHeader>
            <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-muted rounded animate-pulse"></div>
            <div className="h-10 bg-muted rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Mon Profil</h1>
        <Badge variant="secondary">
          Membre depuis {profile ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture & Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback className="bg-gradient-ocean text-white text-xl">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm" className="gap-2">
                <Camera className="w-4 h-4" />
                Changer la photo
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Inscrit le {profile ? new Date(profile.created_at).toLocaleDateString('fr-FR') : 'Aujourd\'hui'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Détails du profil</CardTitle>
            <CardDescription>
              Mettez à jour vos informations personnelles pour une expérience personnalisée
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={formData.first_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                  placeholder="Votre prénom"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={formData.last_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                  placeholder="Votre nom"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Préférences de voyage
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget préféré</Label>
                  <select
                    id="budget"
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                    value={formData.preferences.budget_range}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, budget_range: e.target.value }
                    }))}
                  >
                    <option value="">Sélectionnez un budget</option>
                    <option value="budget">Budget (0-500€)</option>
                    <option value="mid_range">Milieu de gamme (500-1500€)</option>
                    <option value="luxury">Luxe (1500€+)</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="travel_style">Style de voyage</Label>
                  <select
                    id="travel_style"
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
                    value={formData.preferences.travel_style}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, travel_style: e.target.value }
                    }))}
                  >
                    <option value="">Sélectionnez un style</option>
                    <option value="adventure">Aventure</option>
                    <option value="relaxation">Détente</option>
                    <option value="culture">Culture</option>
                    <option value="family">Famille</option>
                    <option value="business">Affaires</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-gradient-ocean hover:shadow-glow transition-all duration-300"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Sauvegarde..." : "Sauvegarder"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;