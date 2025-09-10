import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Clock,
  CheckCircle,
  Minimize2,
  Maximize2
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
}

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: 'bot',
      content: "Bonjour ! 👋 Je suis l'assistant IA de TravelAI. Comment puis-je vous aider avec votre recherche de voyage ?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: getBotResponse(newMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id ? { ...msg, status: 'read' as const } : msg
        ).concat([botResponse])
      );
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('prix') || msg.includes('coût') || msg.includes('tarif')) {
      return "Nos prix sont dynamiques et mis à jour en temps réel. Je peux vous aider à trouver les meilleures offres selon votre budget. Quel est votre budget approximatif ?";
    }
    
    if (msg.includes('maldives') || msg.includes('bali') || msg.includes('destination')) {
      return "Excellente question ! Nos destinations les plus populaires sont les Maldives, Bali, Santorin et le Japon. Souhaitez-vous que je génère un pack IA personnalisé pour l'une d'entre elles ?";
    }
    
    if (msg.includes('ia') || msg.includes('intelligence') || msg.includes('gemini')) {
      return "Notre IA Gemini analyse plus de 100M d'offres en temps réel sur Booking, SkyScanner, Expedia et d'autres plateformes pour vous proposer les meilleurs deals personnalisés. Voulez-vous essayer ?";
    }
    
    if (msg.includes('réservation') || msg.includes('booking') || msg.includes('réserver')) {
      return "Je vous redirige vers nos partenaires de confiance pour finaliser votre réservation. Cela garantit les meilleurs prix et une sécurité maximale. Puis-je vous aider à trouver l'offre parfaite ?";
    }
    
    return "Merci pour votre question ! Pour une assistance personnalisée, je peux vous mettre en relation avec un de nos experts voyage. En attendant, n'hésitez pas à explorer nos packs IA ou à chercher une destination spécifique.";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-ocean hover:shadow-glow transition-all duration-300 shadow-lg"
          size="lg"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </Button>
        
        {/* Notification Badge */}
        <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
          <span className="text-xs font-bold text-white">1</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-80 md:w-96'
    }`}>
      <Card className="shadow-2xl border-0 overflow-hidden">
        {/* Header */}
        <CardHeader className="p-4 bg-gradient-ocean text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                {isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <CardTitle className="text-sm font-semibold text-white">
                  Assistant TravelAI
                </CardTitle>
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  En ligne • Répond en ~30s
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        {!isMinimized && (
          <>
            <CardContent className="p-0 h-80 overflow-y-auto bg-background">
              <div className="space-y-4 p-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${
                      message.type === 'user' 
                        ? 'bg-gradient-ocean text-white' 
                        : 'bg-muted'
                    } rounded-lg p-3`}>
                      <div className="flex items-start gap-2">
                        {message.type !== 'user' && (
                          <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm">{message.content}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs ${
                              message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                            }`}>
                              {formatTime(message.timestamp)}
                            </span>
                            {message.type === 'user' && message.status && (
                              <div className="flex items-center">
                                {message.status === 'sending' && (
                                  <Clock className="w-3 h-3 text-white/70" />
                                )}
                                {message.status === 'read' && (
                                  <CheckCircle className="w-3 h-3 text-white/70" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                        {message.type === 'user' && (
                          <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                      <Bot className="w-4 h-4" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-ocean hover:shadow-glow transition-all duration-300"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>Propulsé par IA Gemini</span>
                <Badge variant="outline" className="text-xs">
                  Réponse instantanée
                </Badge>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ChatSupport;