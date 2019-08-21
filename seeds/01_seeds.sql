
INSERT INTO users (id, name, email, password) 
VALUES 
(1, 'Tessa Hiddy', 'thiddy0@time.com', 'slbpTJ0'),
(2, 'Claudelle Medler', 'cmedler1@bizjournals.com', 'pvORp1k'),
(3, 'Bryn Schreurs', 'bschreurs2@ucsd.edu', 'VLxVi2')

INSERT INTO properties (
  id, owner_id, title, description, 
  thumbnail_photo_url, 
  cover_photo_url, cost_per_night, 
  street,
  parking_spaces, number_of_bathrooms, number_of_bedrooms, 
  country, province, post_code) 

VALUES 
(1, 1, 'MacGyverMcDermottandLehner', 'DegliAntoni', 
'http://dummyimage.com/187x112.jpg/dddddd/000000', 
'http://dummyimage.com/230x172.jpg/dddddd/000000', 300, 
'7662CanaryPark',
1, 2, 1,
'Indonesia', 'ID', 'M1S32T'),

(2, 2, 'Kuhlman Weimann', 'Davitashvili', 
'http://dummyimage.com/194x108.png/5fa2dd/ffffff', 
'http://dummyimage.com/232x126.bmp/cc0000/ffffff', 450, 
'07009 Badeau Street', 
2, 1, 2, 
'Vietnam', 'VN', 'M123YT'),

(3, 3, 'Moore Inc', 'Kmietsch', 
'http://dummyimage.com/249x226.png/cc0000/ffffff', 
'http://dummyimage.com/107x214.jpg/cc0000/ffffff', 1000, 
'19925 Mosinee Park', 
1, 2, 3, 
'DominicanRepublic', 'DO', 'M13DF4');


-- INSERT INTO property_reviews (id, guest_id, reservation_id, property_id, rating, message) 
-- VALUES 
-- (1, 1, 1, 1, 5, 'Very good!'),
-- (2, 2, 2, 2, 4, 'Nice decor.'),
-- (3, 3, 3, 3, 2, 'Kind of smells.');