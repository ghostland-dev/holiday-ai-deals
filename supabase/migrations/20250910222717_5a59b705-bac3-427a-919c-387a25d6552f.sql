-- Insert final batch of travel deals with specialized images
INSERT INTO public.deals (
  title, description, destination, price, original_price, currency, 
  image_url, category, provider, provider_url, featured, tags, max_participants
) VALUES
-- Wellness & Spa deals
('Retraite Spa Luxury', 'Séjour bien-être avec soins spa et yoga', 'Bali, Indonesia', 899, 1199, 'EUR', '/src/assets/spa-wellness.jpg', 'package', 'WellnessTravel', 'https://wellnesstravel.com/bali-spa', true, '{"spa", "wellness", "yoga"}', 4),
('Weekend Détente', 'Package relaxation avec massages et piscine', 'Swiss Alps', 650, 850, 'EUR', '/src/assets/spa-wellness.jpg', 'hotel', 'AlpineWellness', 'https://alpinewellness.com/detente', false, '{"détente", "montagne", "spa"}', 2),

-- Adventure deals
('Trekking Patagonie', 'Randonnée aventure dans les Andes', 'Patagonia, Chile', 1299, 1599, 'EUR', '/src/assets/adventure-hiking.jpg', 'activity', 'AdventureExpeditions', 'https://adventureexpeditions.com/patagonia', true, '{"trekking", "aventure", "montagne"}', 8),
('Escalade Extrême', 'Week-end d''escalade en montagne avec guide', 'Swiss Alps', 399, 499, 'EUR', '/src/assets/adventure-hiking.jpg', 'activity', 'MountainGuides', 'https://mountainguides.com/escalade', false, '{"escalade", "sport", "guide"}', 6),

-- Safari deals
('Safari Kenya', 'Safari photo dans les réserves du Kenya', 'Masai Mara, Kenya', 1599, 1999, 'EUR', '/src/assets/safari-africa.jpg', 'package', 'AfricanSafaris', 'https://africansafaris.com/kenya', true, '{"safari", "wildlife", "photo"}', 6),
('Safari Tanzanie', 'Circuit safari avec camping sous les étoiles', 'Serengeti, Tanzania', 1799, 2299, 'EUR', '/src/assets/safari-africa.jpg', 'package', 'AfricanSafaris', 'https://africansafaris.com/tanzania', false, '{"safari", "camping", "nature"}', 8),

-- Northern Lights deals  
('Aurores Boréales', 'Chasse aux aurores boréales en Islande', 'Reykjavik, Iceland', 799, 999, 'EUR', '/src/assets/iceland-aurora.jpg', 'package', 'NordicAdventures', 'https://nordicadventures.com/aurora', true, '{"aurores", "islande", "nature"}', 4),
('Circuit Islande', 'Tour complet de l''île avec sources chaudes', 'Iceland', 1299, 1699, 'EUR', '/src/assets/iceland-aurora.jpg', 'package', 'NordicAdventures', 'https://nordicadventures.com/iceland-tour', false, '{"circuit", "géologie", "sources"}', 10),

-- Dubai luxury deals
('Dubai Prestige', 'Séjour luxury avec hôtel 5 étoiles Burj Al Arab', 'Dubai, UAE', 1899, 2499, 'EUR', '/src/assets/dubai-luxury.jpg', 'package', 'MiddleEastLuxury', 'https://middleeastluxury.com/dubai-prestige', true, '{"luxe", "5-étoiles", "prestige"}', 2),
('Business Dubai', 'Package affaires avec transferts VIP', 'Dubai, UAE', 1299, 1699, 'EUR', '/src/assets/dubai-luxury.jpg', 'hotel', 'BusinessME', 'https://businessme.com/dubai', false, '{"business", "vip", "transferts"}', 1);