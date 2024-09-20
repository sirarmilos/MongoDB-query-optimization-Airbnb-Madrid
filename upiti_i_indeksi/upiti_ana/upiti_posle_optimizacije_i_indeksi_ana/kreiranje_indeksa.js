// Upit 1
db['listings_detailed_final'].createIndex({ host_is_superhost: 1, bathrooms_text: 1 })

// Upit 2
db['listings_final'].createIndex([('neighbourhood', 1)])
db['reviews'].createIndex([('listing_id', 1)])

// Upit 3
db['listings_detailed_final'].createIndex({ host_is_superhost: 1, picture_url: 1 })

// Upit 4
//db['listings_final'].createIndex({'neighbourhood' : 1})
//isti indeks kao za upit 2

// Upit 5
db['listings_detailed_final'].createIndex({ minimum_nights: 1, bedrooms: 1 })

