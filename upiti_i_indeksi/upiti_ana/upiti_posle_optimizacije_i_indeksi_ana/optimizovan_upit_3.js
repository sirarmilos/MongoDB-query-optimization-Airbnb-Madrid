db['listings_detailed_final'].createIndex({ host_is_superhost: 1, picture_url: 1 })

db.listings_detailed_final.aggregate([
    {
        $unwind: "$available_dates"
    },
    {
        $match: {
            $and: [
                { "available_dates": { $gte: "2021-04-15", $lte: "2021-04-17" } },
                { "host_is_superhost": "t" },
                { "picture_url": { $exists: true, $ne: null } }
            ]
        }
    },
    {
        $group: {
            _id: "$id",
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: 0,
            listing_id: "$_id",
            count: 1
        }
    },
    {
        $sort: { "listing_id": 1 }
    }
])

