-- Insert final deals with remaining specialized images
INSERT INTO public.deals (
  title, description, destination, price, original_price, currency, 
  image_url, category, provider, provider_url, featured, tags, max_participants
) VALUES
-- Japan cultural deals
('Kyoto Spirituel', 'Découverte des temples et jardins zen de Kyoto', 'Kyoto, Japan', 1199, 1499, 'EUR', '/src/assets/kyoto-temples.jpg', 'package', 'JapanCultural', 'https://japancultural.com/kyoto-temples', true, '{"temples", "zen", "culture"}', 6),
('Circuit Japon', 'Tour culturel de 10 jours à travers le Japon', 'Japan', 2499, 2999, 'EUR', '/src/assets/kyoto-temples.jpg', 'package', 'JapanCultural', 'https://japancultural.com/circuit', false, '{"circuit", "culture", "temples"}', 12),

-- Caribbean beach deals
('Caraïbes Détente', 'Séjour plage tout inclus aux Antilles', 'Caribbean Islands', 899, 1199, 'EUR', '/src/assets/caribbean-beach.jpg', 'package', 'CaribbeanResorts', 'https://caribbeanresorts.com/all-inclusive', true, '{"plage", "tout-inclus", "détente"}', 4),
('Vol Caraïbes', 'Vol direct vers les îles paradisiaques', 'Caribbean Islands', 399, 549, 'EUR', '/src/assets/caribbean-beach.jpg', 'flight', 'CaribbeanAir', 'https://caribbeanair.com/flights', false, '{"vol", "îles", "tropical"}', 1),

-- India heritage deals
('Inde Mystique', 'Circuit découverte avec Taj Mahal et palais rajasthani', 'Agra, India', 1299, 1699, 'EUR', '/src/assets/india-tajmahal.jpg', 'package', 'IndiaHeritage', 'https://indiaheritage.com/taj-mahal', true, '{"taj-mahal", "palais", "culture"}', 8),
('Triangle d''Or', 'Delhi, Agra, Jaipur - circuit classique indien', 'India', 1599, 1999, 'EUR', '/src/assets/india-tajmahal.jpg', 'package', 'IndiaHeritage', 'https://indiaheritage.com/golden-triangle', false, '{"delhi", "agra", "jaipur"}', 10),

-- More diverse deals using existing images
('Weekend Maldives', 'Escapade romantique sur pilotis', 'Maldives', 1899, 2399, 'EUR', '/src/assets/maldives-luxury.jpg', 'package', 'MaldivesLuxury', 'https://maldivesluxury.com/romantic', true, '{"romantique", "pilotis", "luxe"}', 2),
('Croisière Méditerranée', 'Croisière 7 jours Barcelone-Rome', 'Mediterranean Sea', 799, 999, 'EUR', '/src/assets/barcelona-spain.jpg', 'package', 'MedCruises', 'https://medcruises.com/barcelona-rome', false, '{"croisière", "méditerranée", "plusieurs villes"}', 200);