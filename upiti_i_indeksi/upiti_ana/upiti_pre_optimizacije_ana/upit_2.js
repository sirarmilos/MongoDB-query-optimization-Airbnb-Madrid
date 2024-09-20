db.calendar_4.aggregate([
    {
        $lookup: {
            from: "listings",
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
                { "date": "2021-04-14" },
                { "available": "t" }
            ]
        }
    },
    {
        $lookup: {
            from: "reviews",
            localField: "listing_id",
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
        $group: {
            _id: { neighbourhood: "$listings_info.neighbourhood", listing_id: "$listing_id" },
            price: { $first: "$listings_info.price" },
            reviews_count: { $first: "$reviews_count" }
        }
    },
    {
        $group: {
            _id: "$_id.neighbourhood",
            average_price: { $avg: "$price" },
            count: { $sum: { $cond: [{ $gte: ["$reviews_count", 50] }, 1, 0] } }
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
