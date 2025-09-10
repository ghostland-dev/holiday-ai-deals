-- Update deals with generated image URLs
UPDATE public.deals SET image_url = '/src/assets/paris-romantic.jpg'
WHERE title LIKE '%Paris%' OR destination LIKE '%Paris%';

UPDATE public.deals SET image_url = '/src/assets/tokyo-adventure.jpg'
WHERE title LIKE '%Tokyo%' OR destination LIKE '%Tokyo%' OR destination LIKE '%Japon%';

UPDATE public.deals SET image_url = '/src/assets/maldives-luxury.jpg'
WHERE title LIKE '%Maldives%' OR destination LIKE '%Maldives%' OR title LIKE '%luxe%';

UPDATE public.deals SET image_url = '/src/assets/greece-classic.jpg'
WHERE title LIKE '%Grèce%' OR destination LIKE '%Grèce%' OR destination LIKE '%Santorini%';

UPDATE public.deals SET image_url = '/src/assets/nyc-business.jpg'
WHERE title LIKE '%New York%' OR destination LIKE '%New York%' OR title LIKE '%business%';

UPDATE public.deals SET image_url = '/src/assets/swiss-alps.jpg'
WHERE title LIKE '%Suisse%' OR destination LIKE '%Suisse%' OR title LIKE '%montagne%' OR title LIKE '%Alps%';

-- Update remaining deals with appropriate fallback images
UPDATE public.deals SET image_url = '/src/assets/hero-travel-bg.jpg'
WHERE image_url IS NULL;