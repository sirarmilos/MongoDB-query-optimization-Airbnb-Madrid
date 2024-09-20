db['listings_detailed_final'].createIndex({ minimum_nights: 1, bedrooms: 1 })

db.listings_detailed_final.aggregate([
    {
        $unwind: "$available_dates"
    },
    {
        $match: {
            $and: [
                { "available_dates": "2021-04-26" },
                { "minimum_nights": 3 },
                { "bedrooms": 3 }
            ]
        }
    },
    {
        $count: "total_count"
    }
])
