import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Settings, 
  Users, 
  BarChart3, 
  Globe, 
  Plus, 
  Edit, 
  Trash2,
  Save,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import SEOHead from './SEOHead';

interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  destination: string;
  image: string;
  featured: boolean;
  active: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  registeredAt: string;
  lastActive: string;
  status: 'active' | 'inactive';
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('deals');
  const [deals, setDeals] = useState<Deal[]>([
    {
      id: '1',
      title: 'Paris Romantique',
      description: '3 jours à Paris avec hôtel 4 étoiles',
      price: 299,
      originalPrice: 499,
      destination: 'Paris',
      image: '/api/placeholder/300/200',
      featured: true,
      active: true
    }
  ]);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'user@example.com',
      name: 'Jean Dupont',
      registeredAt: '2024-01-15',
      lastActive: '2024-01-20',
      status: 'active'
    }
  ]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddDeal = () => {
    const newDeal: Deal = {
      id: Date.now().toString(),
      title: 'Nouveau Deal',
      description: 'Description du deal',
      price: 0,
      originalPrice: 0,
      destination: '',
      image: '',
      featured: false,
      active: true
    };
    setDeals([...deals, newDeal]);
    showNotification('success', 'Deal ajouté avec succès');
  };

  const handleDeleteDeal = (id: string) => {
    setDeals(deals.filter(deal => deal.id !== id));
    showNotification('success', 'Deal supprimé avec succès');
  };

  const handleToggleDealStatus = (id: string) => {
    setDeals(deals.map(deal => 
      deal.id === id ? { ...deal, active: !deal.active } : deal
    ));
    showNotification('success', 'Statut du deal mis à jour');
  };

  const handleToggleUserStatus = (id: string) => {
    setUsers(users.map(user => 
      user.id === id ? { 
        ...user, 
        status: user.status === 'active' ? 'inactive' : 'active' 
      } : user
    ));
    showNotification('success', 'Statut de l\'utilisateur mis à jour');
  };

  const stats = {
    totalDeals: deals.length,
    activeDeals: deals.filter(d => d.active).length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length
  };

  return (
    <>
      <SEOHead 
        title="Dashboard Admin - TravelAI"
        description="Interface d'administration pour gérer les deals, utilisateurs et analytics de TravelAI"
        noIndex={true}
      />
      
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard Admin</h1>
              <p className="text-muted-foreground">Gérez votre plateforme TravelAI</p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Paramètres
            </Button>
          </div>

          {notification && (
            <Alert className={`mb-6 ${notification.type === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              {notification.type === 'success' ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={notification.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                {notification.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDeals}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeDeals} actifs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.activeUsers} actifs
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Revenus</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€12,450</div>
                <p className="text-xs text-muted-foreground">
                  +12% ce mois
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  +0.5% ce mois
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="deals">Deals</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="deals" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Gestion des Deals</h2>
                <Button onClick={handleAddDeal}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Deal
                </Button>
              </div>

              <div className="grid gap-4">
                {deals.map((deal) => (
                  <Card key={deal.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold">{deal.title}</h3>
                            <Badge variant={deal.active ? "default" : "secondary"}>
                              {deal.active ? 'Actif' : 'Inactif'}
                            </Badge>
                            {deal.featured && (
                              <Badge variant="outline">Mis en avant</Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{deal.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-primary">€{deal.price}</span>
                            <span className="text-lg line-through text-muted-foreground">€{deal.originalPrice}</span>
                            <span className="text-sm text-muted-foreground">• {deal.destination}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleDealStatus(deal.id)}
                          >
                            {deal.active ? 'Désactiver' : 'Activer'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteDeal(deal.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
              
              <div className="grid gap-4">
                {users.map((user) => (
                  <Card key={user.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <Badge variant={user.status === 'active' ? "default" : "secondary"}>
                              {user.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <span>Inscrit: {user.registeredAt}</span>
                            <span>Dernière activité: {user.lastActive}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            {user.status === 'active' ? 'Suspendre' : 'Activer'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics & Rapports</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ventes par Mois</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Graphique des ventes (à intégrer avec Recharts)
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Destinations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Paris</span>
                        <span className="font-semibold">42%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Londres</span>
                        <span className="font-semibold">28%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rome</span>
                        <span className="font-semibold">18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Barcelona</span>
                        <span className="font-semibold">12%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;