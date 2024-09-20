db.calendar_4.aggregate([
{
    $lookup:
    {
        from : "listings_detailed",
        localField : "listing_id",
        foreignField: "id",
        as : "listings_info"
    }
},
{
    $unwind : "$listings_info"
},
{
    $match : {
        $and : [
        {"date" : {$gte : "2021-04-15"}},
        {"date" : {$lte : "2021-04-17"}},
        {"available" : "t"},
        {"listings_info.host_is_superhost" : "t"},
        {"listings_info.picture_url": { $exists: true, $nin: [NaN] }}
        ]
    }
},
{
        $project: {
            listing_id: 1,
            date: 1,
            available: 1,
            "listings_info.listing_id": 1,
            "listings_info.host_is_superhost": 1,
            "listings_info.picture_url": 1
        }
    },
{
        $group: {
            _id: "$listing_id",
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
    $sort : {"listing_id" : 1}
},     

])