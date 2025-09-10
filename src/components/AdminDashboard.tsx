import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Eye, 
  ExternalLink,
  Calendar,
  BarChart3,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";

interface AdminStats {
  totalClics: number;
  totalCommissions: number;
  activeUsers: number;
  conversionRate: number;
  topProviders: Array<{
    name: string;
    clics: number;
    commissions: number;
  }>;
  recentActivity: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    amount?: number;
  }>;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalClics: 24567,
    totalCommissions: 15840.50,
    activeUsers: 1247,
    conversionRate: 3.2,
    topProviders: [
      { name: "Booking.com", clics: 8942, commissions: 6850.20 },
      { name: "SkyScanner", clics: 6834, commissions: 4120.80 },
      { name: "Expedia", clics: 4521, commissions: 2940.15 },
      { name: "Agoda", clics: 3270, commissions: 1929.35 }
    ],
    recentActivity: [
      {
        id: "1",
        type: "commission",
        description: "Commission Booking.com - Réservation Maldives",
        timestamp: "Il y a 2 minutes",
        amount: 127.50
      },
      {
        id: "2", 
        type: "clic",
        description: "Clic SkyScanner - Vol Paris-Tokyo",
        timestamp: "Il y a 5 minutes"
      },
      {
        id: "3",
        type: "user",
        description: "Nouvel utilisateur inscrit",
        timestamp: "Il y a 8 minutes"
      },
      {
        id: "4",
        type: "commission",
        description: "Commission Expedia - Safari Kenya",
        timestamp: "Il y a 12 minutes", 
        amount: 89.20
      }
    ]
  });

  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Admin</h1>
          <p className="text-muted-foreground">Aperçu des performances TravelAI</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-md"
          >
            <option value="24h">Dernières 24h</option>
            <option value="7d">7 derniers jours</option>
            <option value="30d">30 derniers jours</option>
            <option value="90d">90 derniers jours</option>
          </select>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Clics Totaux</p>
                <p className="text-2xl font-bold">{stats.totalClics.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">+12.5%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Commissions</p>
                <p className="text-2xl font-bold">{stats.totalCommissions.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">+8.2%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">+15.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Taux de Conversion</p>
                <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                <div className="flex items-center gap-1 text-sm">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-green-500">+0.8%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Providers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5" />
              Fournisseurs Performants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topProviders.map((provider, index) => (
                <div key={provider.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-ocean rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold">{provider.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {provider.clics.toLocaleString()} clics
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {provider.commissions.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                    </p>
                    <p className="text-xs text-muted-foreground">commissions</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'commission' ? 'bg-green-500' :
                    activity.type === 'clic' ? 'bg-blue-500' : 'bg-purple-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      {activity.amount && (
                        <Badge className="bg-green-500/10 text-green-700 border-green-200">
                          +{activity.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="w-full justify-start" variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Gérer les Liens d'Affiliation
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              Exporter les Rapports
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Gérer les Utilisateurs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;