db['listings_final'].createIndex({'neighbourhood' : 1})


db.listings_final.aggregate([
    {
        $unwind: "$available_dates"
    },
    {
        $match: {
            $and: [
                { "available_dates": { $gte: "2021-04-17", $lte: "2021-04-21" } },
                { "neighbourhood": "Sol" }
                
            ]
        }
    },
    {
        $group: {
            _id: "$id",
            count: { $sum: 1 },
            neighbourhood: { $first: "$neighbourhood" },
            dates: { $push: "$available_dates" }
        }
    },
    {
        $project: {
            _id: 0,
            listing_id: "$_id",
            dates: 1,
            neighbourhood: 1
        }
    },
    {
        $sort: { "listing_id": 1 }
    }
])
