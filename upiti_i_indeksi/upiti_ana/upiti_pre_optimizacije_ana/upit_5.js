db.calendar_4.aggregate([
    {
        $lookup: {
            from: "listings_detailed",
            localField: "listing_id",
            foreignField: "id",
            as: "listings_info"
        }
    },
    {
        $unwind: "$listings_info"
    },
    {
        $match: {
            $and: [
                { "date": "2021-04-26" },
                { "available": "t" },
                { "listings_info.minimum_nights": 3 },
                { "listings_info.bedrooms": 3 }
            ]
        }
    },
    {
        $count: "total_count"
    }
])
