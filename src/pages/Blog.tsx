import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  User, 
  Search,
  TrendingUp,
  MapPin,
  Plane,
  Heart,
  Share2,
  BookOpen
} from "lucide-react";
import { useState } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "Les Maldives à Petit Prix : Notre IA Révèle 5 Secrets",
      excerpt: "Découvrez comment notre intelligence artificielle a analysé 50,000 offres pour révéler les meilleures stratégies pour séjourner aux Maldives sans se ruiner.",
      content: "",
      author: "Sophie Chen",
      publishDate: "2024-01-15",
      readTime: "8 min",
      category: "destinations",
      tags: ["Maldives", "Budget", "IA", "Conseils"],
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: "2",
      title: "Comment l'IA Révolutionne la Planification de Voyage",
      excerpt: "Plongée dans les coulisses de notre technologie Gemini et comment elle trouve des deals impossibles à dénicher manuellement.",
      content: "",
      author: "Marc Dubois",
      publishDate: "2024-01-12",
      readTime: "6 min",
      category: "technologie",
      tags: ["IA", "Innovation", "Technologie", "Gemini"],
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
      featured: true
    },
    {
      id: "3",
      title: "Bali vs Santorin : Analyse Complète des Prix 2024",
      excerpt: "Notre IA compare en temps réel ces deux destinations de rêve. Résultats surprenants sur les meilleurs moments pour réserver.",
      content: "",
      author: "Emma Laurent",
      publishDate: "2024-01-10",
      readTime: "10 min",
      category: "destinations",
      tags: ["Bali", "Santorin", "Comparatif", "2024"],
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: "4",
      title: "10 Erreurs à Éviter Lors de la Réservation en Ligne",
      excerpt: "Guide complet basé sur l'analyse de millions de réservations. Ces erreurs vous font perdre en moyenne 347€ par voyage.",
      content: "",
      author: "Thomas Martin",
      publishDate: "2024-01-08",
      readTime: "12 min",
      category: "conseils",
      tags: ["Réservation", "Erreurs", "Économies", "Guide"],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: "5",
      title: "Japon 2024 : Quand Partir pour Économiser 40%",
      excerpt: "Notre analyse prédictive révèle les fenêtres optimales pour visiter le Japon en économisant massivement sur les vols et hébergements.",
      content: "",
      author: "Yuki Tanaka",
      publishDate: "2024-01-05",
      readTime: "7 min",
      category: "destinations",
      tags: ["Japon", "Économies", "Prédiction", "IA"],
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
      featured: false
    },
    {
      id: "6",
      title: "L'Avenir du Voyage : Prédictions IA pour 2025",
      excerpt: "Tendances émergentes, nouvelles destinations, évolution des prix : notre IA prédit l'avenir du secteur voyage.",
      content: "",
      author: "Dr. Sarah Kim",
      publishDate: "2024-01-03",
      readTime: "15 min",
      category: "tendances",
      tags: ["Futur", "Prédictions", "Tendances", "2025"],
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop",
      featured: false
    }
  ];

  const categories = [
    { id: "all", name: "Tous", icon: BookOpen },
    { id: "destinations", name: "Destinations", icon: MapPin },
    { id: "technologie", name: "Technologie", icon: TrendingUp },
    { id: "conseils", name: "Conseils", icon: Heart },
    { id: "tendances", name: "Tendances", icon: Plane }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="container mx-auto px-4 py-24 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-gradient-sunset px-4 py-2 rounded-full text-white font-semibold mb-6">
          <BookOpen className="w-5 h-5" />
          Blog TravelAI
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Voyage & Intelligence
          <span className="block text-primary">Artificielle</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez les secrets du voyage intelligent, les analyses de notre IA et les tendances 
          qui révolutionnent l'industrie du voyage.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Rechercher des articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Articles en Vedette
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-card transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground">
                      Vedette
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Button className="bg-gradient-ocean hover:shadow-glow transition-all duration-300">
                      Lire l'Article
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularPosts.map((post) => (
          <Card key={post.id} className="group hover:shadow-card transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="capitalize">
                  {post.category}
                </Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(post.publishDate).toLocaleDateString('fr-FR')}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </div>
              </div>
              
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h3>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                
                <Button size="sm" variant="outline">
                  Lire Plus
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Newsletter CTA */}
      <Card className="mt-16 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Restez Informé</h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Recevez nos derniers articles et analyses directement dans votre boîte mail. 
            Soyez le premier à connaître les nouvelles tendances voyage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="votre@email.com" className="flex-1" />
            <Button className="bg-gradient-ocean hover:shadow-glow transition-all duration-300">
              S'abonner
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blog;