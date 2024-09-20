db['listings_final'].createIndex([('neighbourhood', 1)])
db['reviews'].createIndex([('listing_id', 1)])

db.listings_final.aggregate([
    {
        $unwind: "$available_dates"
    },
    {
        $match: {
            "available_dates": "2021-04-14"
        }
    },
    {
        $lookup: {
            from: "reviews",
            localField: "id",
            foreignField: "listing_id",
            as: "reviews_info"
        }
    },
    {
        $addFields: {
            reviews_count: { $size: "$reviews_info" }
        }
    },
    {
        $match: {
            reviews_count: { $gte: 50 }
        }
    },
    {
        $group: {
            _id: "$neighbourhood",
            average_price: { $avg: "$price" },
            count: { $sum: 1 }
        }
    },
    {
        $match: {
            count: { $gt: 0 }
        }
    },
    {
        $project: {
            _id: 0,
            neighbourhood: "$_id",
            average_price: 1
        }
    },
    {
        $sort: { "neighbourhood": 1 }
    }
])
