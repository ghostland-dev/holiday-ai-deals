-- Insert more travel deals with the new images
INSERT INTO public.deals (
  title, description, destination, price, original_price, currency, 
  image_url, category, provider, provider_url, featured, tags, max_participants
) VALUES
-- London deals
('Weekend à Londres', 'Découvrez la capitale britannique avec ses monuments emblématiques', 'London, UK', 349, 449, 'EUR', '/src/assets/london-classic.jpg', 'package', 'BritTravel', 'https://brittravel.com/london-weekend', false, '{"city break", "culture", "monuments"}', 4),
('Séjour Business Londres', 'Package professionnel avec hôtel 4 étoiles et transport', 'London, UK', 599, 799, 'EUR', '/src/assets/london-classic.jpg', 'hotel', 'BusinessTravel', 'https://businesstravel.com/london', false, '{"business", "premium", "transport"}', 2),

-- Italy deals  
('Toscane Romantique', 'Week-end en amoureux dans la campagne toscane', 'Tuscany, Italy', 420, 580, 'EUR', '/src/assets/italy-tuscany.jpg', 'package', 'ItaliaVacanze', 'https://italiavacanze.com/toscane', true, '{"romantique", "campagne", "vin"}', 2),
('Tour de la Toscane', 'Circuit gastronomique et culturel en Toscane', 'Tuscany, Italy', 785, 950, 'EUR', '/src/assets/italy-tuscany.jpg', 'package', 'ItaliaVacanze', 'https://italiavacanze.com/tour-toscane', false, '{"gastronomie", "culture", "circuit"}', 8),

-- Barcelona deals
('Barcelone Express', 'City break de 3 jours à Barcelone avec visite Gaudi', 'Barcelona, Spain', 289, 359, 'EUR', '/src/assets/barcelona-spain.jpg', 'package', 'IberiaTravel', 'https://iberiatravel.com/barcelona', false, '{"architecture", "art", "city"}', 6),
('Weekend Barcelone', 'Séjour culturel avec guide et entrées monuments', 'Barcelona, Spain', 445, 545, 'EUR', '/src/assets/barcelona-spain.jpg', 'package', 'IberiaTravel', 'https://iberiatravel.com/barcelona-culture', true, '{"culture", "guide", "monuments"}', 4),

-- Egypt deals
('Mystères d''Égypte', 'Circuit des pyramides et croisière sur le Nil', 'Cairo, Egypt', 899, 1199, 'EUR', '/src/assets/egypt-pyramids.jpg', 'package', 'PharaohTours', 'https://pharaohtours.com/pyramides', true, '{"pyramides", "croisière", "histoire"}', 12),
('Vol Le Caire', 'Vol aller-retour vers la capitale égyptienne', 'Cairo, Egypt', 445, 595, 'EUR', '/src/assets/egypt-pyramids.jpg', 'flight', 'EgyptAir', 'https://egyptair.com/cairo', false, '{"vol", "moyen-orient"}', 1),

-- Brazil deals
('Rio Carnaval', 'Séjour pendant le carnaval de Rio avec spectacles', 'Rio de Janeiro, Brazil', 1299, 1699, 'EUR', '/src/assets/brazil-rio.jpg', 'package', 'BrazilAdventure', 'https://braziladventure.com/carnival', true, '{"carnaval", "fête", "plages"}', 6),
('Vol Rio de Janeiro', 'Vol direct vers la ville merveilleuse', 'Rio de Janeiro, Brazil', 699, 899, 'EUR', '/src/assets/brazil-rio.jpg', 'flight', 'LATAM', 'https://latam.com/rio', false, '{"vol", "amérique-sud"}', 1);