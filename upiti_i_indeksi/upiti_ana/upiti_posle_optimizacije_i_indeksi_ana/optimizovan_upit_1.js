db['listings_detailed_final'].createIndex({ host_is_superhost: 1, bathrooms_text: 1 })

db.listings_detailed_final.aggregate([
    {
        $unwind: "$available_dates"
    },
    {
        $match: {
            $and: [
                { "available_dates" : "2021-04-14" },
                { "host_is_superhost": "t" },
                { "bathrooms_text": { $not: { $regex: "shared", $options: "i" } } }
            ]
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
        $group: {
            _id: "$neighbourhood_cleansed",
            host_is_superhost: { $first: "$host_is_superhost" },
            bathrooms_text: { $push: "$bathrooms_text" },
            num_reviews: {
                $sum: {
                    $cond: {
                        if: { $isArray: "$reviews_info" },
                        then: { $size: "$reviews_info" },
                        else: 0
                    }
                }
            }
        }
    },
    {
        $project: {
            _id: 0,
            neighbourhood: "$_id",
            host_is_superhost: 1,
            bathrooms_text: 1,
            num_reviews: 1
        }
    },
    {
        $sort: { "num_reviews": -1 }
    }
])
