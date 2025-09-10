import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Clock, 
  TrendingUp, 
  X,
  Plane,
  Calendar,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { analytics } from "@/utils/analytics";

interface SearchSuggestion {
  id: string;
  type: 'destination' | 'deal' | 'keyword';
  title: string;
  subtitle?: string;
  icon: React.ComponentType<any>;
  trending?: boolean;
  price?: number;
}

interface SearchBarProps {
  onSearch: (query: string, filters?: any) => void;
  placeholder?: string;
  showFilters?: boolean;
}

const SearchBar = ({ 
  onSearch, 
  placeholder = "Rechercher destinations, deals, packs IA...",
  showFilters = true 
}: SearchBarProps) => {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('travelai-recent-searches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (error) {
        console.warn('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Popular suggestions when no query
  const popularSuggestions: SearchSuggestion[] = [
    {
      id: '1',
      type: 'destination',
      title: 'Maldives',
      subtitle: 'À partir de 899€',
      icon: MapPin,
      trending: true,
      price: 899
    },
    {
      id: '2',
      type: 'destination', 
      title: 'Bali',
      subtitle: 'À partir de 649€',
      icon: MapPin,
      trending: true,
      price: 649
    },
    {
      id: '3',
      type: 'deal',
      title: 'Weekend Europe',
      subtitle: 'Vol + Hôtel dès 199€',
      icon: Plane,
      price: 199
    },
    {
      id: '4',
      type: 'keyword',
      title: 'All Inclusive',
      subtitle: 'Séjours tout compris',
      icon: TrendingUp
    },
    {
      id: '5',
      type: 'keyword',
      title: 'Last Minute',
      subtitle: 'Deals de dernière minute',
      icon: Clock
    }
  ];

  // Fetch search suggestions
  const fetchSuggestions = async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setSuggestions(popularSuggestions);
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call - replace with real search API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const mockResults: SearchSuggestion[] = [
        {
          id: 'dest-1',
          type: 'destination' as const,
          title: 'Tokyo, Japon',
          subtitle: 'Vols à partir de 580€',
          icon: MapPin,
          price: 580
        },
        {
          id: 'deal-1',
          type: 'deal' as const,
          title: 'Pack Tokyo + Kyoto',
          subtitle: '7 jours, vol + hôtel',
          icon: Plane,
          price: 1299
        },
        {
          id: 'dest-2',
          type: 'destination' as const,
          title: 'Santorin, Grèce',
          subtitle: 'À partir de 389€',
          icon: MapPin,
          trending: true,
          price: 389
        }
      ].filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSuggestions(mockResults);
    } catch (error) {
      console.error('Search suggestions failed:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    
    if (value.trim()) {
      fetchSuggestions(value);
      setIsOpen(true);
    } else {
      setSuggestions(popularSuggestions);
      setIsOpen(true);
    }
  };

  // Handle search submit
  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (!finalQuery.trim()) return;

    // Save to recent searches
    const updatedRecent = [finalQuery, ...recentSearches.filter(s => s !== finalQuery)].slice(0, 5);
    setRecentSearches(updatedRecent);
    localStorage.setItem('travelai-recent-searches', JSON.stringify(updatedRecent));

    // Track search
    analytics.trackSearch(finalQuery, suggestions.length);

    // Execute search
    onSearch(finalQuery);
    setIsOpen(false);
    setQuery(finalQuery);

    toast({
      title: "Recherche lancée",
      description: `Recherche de "${finalQuery}" en cours...`,
    });
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const searchTerm = suggestion.title;
    setQuery(searchTerm);
    handleSearch(searchTerm);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0) {
          handleSuggestionClick(suggestions[activeIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setActiveIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          className="pl-12 pr-12 h-14 text-lg bg-white/95 backdrop-blur-sm border-2 border-primary/20 focus:border-primary/50 transition-colors"
        />
        
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setSuggestions(popularSuggestions);
              inputRef.current?.focus();
            }}
            className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        <Button
          onClick={() => handleSearch()}
          disabled={!query.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-4 bg-gradient-ocean hover:shadow-glow transition-all duration-300"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && (
        <Card 
          ref={suggestionsRef}
          className="absolute top-full mt-2 w-full z-50 shadow-2xl border-primary/20 max-h-96 overflow-hidden"
        >
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin w-5 h-5 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                Recherche en cours...
              </div>
            ) : (
              <>
                {/* Recent Searches */}
                {!query && recentSearches.length > 0 && (
                  <div className="p-4 border-b">
                    <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Recherches récentes
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                          onClick={() => handleSearch(search)}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                <div className="max-h-80 overflow-y-auto">
                  {suggestions.length > 0 ? (
                    suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <div
                          key={suggestion.id}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-border/50 last:border-0 ${
                            index === activeIndex ? 'bg-primary/5' : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{suggestion.title}</span>
                              {suggestion.trending && (
                                <Badge variant="secondary" className="text-xs">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Tendance
                                </Badge>
                              )}
                            </div>
                            {suggestion.subtitle && (
                              <p className="text-sm text-muted-foreground">
                                {suggestion.subtitle}
                              </p>
                            )}
                          </div>

                          {suggestion.price && (
                            <div className="text-right">
                              <div className="font-bold text-accent">
                                {suggestion.price}€
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Search className="w-12 h-12 mx-auto mb-4 opacity-30" />
                      <p>Aucun résultat trouvé</p>
                      <p className="text-sm">Essayez avec d'autres mots-clés</p>
                    </div>
                  )}
                </div>

                {/* Quick Filters */}
                {showFilters && (
                  <div className="p-4 border-t bg-muted/20">
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant="outline" 
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleSearch("deals dernière minute")}
                      >
                        <Calendar className="w-3 h-3 mr-1" />
                        Last Minute
                      </Badge>
                      <Badge 
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleSearch("famille")}
                      >
                        <Users className="w-3 h-3 mr-1" />
                        Famille
                      </Badge>
                      <Badge 
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleSearch("all inclusive")}
                      >
                        All Inclusive
                      </Badge>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchBar;