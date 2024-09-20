db.calendar_4.aggregate([
{
    $lookup:
    {
        from : "listings",
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
        {"date" : {$gte : "2021-04-17"}},
        {"date" : {$lte : "2021-04-21"}},
        {"available" : "t"},
        {"listings_info.neighbourhood": "Sol"}]
    }
},
{
        $project: {
            listing_id: 1,
            date: 1,
            available: 1,
            "listings_info.listing_id": 1,
            "listings_info.neighbourhood": 1,
        }
    },
{
        $group: {
            _id: "$listing_id",
            neighbourhoods: { $first: "$listings_info.neighbourhood" },
            dates: { $push: "$date" }
        }
    },
    {
        $project: {
            _id: 0,
            listing_id: "$_id",
            dates: 1,
            neighbourhoods: 1
        }
    },
{
    $sort : {"listing_id" : 1}
},     

])