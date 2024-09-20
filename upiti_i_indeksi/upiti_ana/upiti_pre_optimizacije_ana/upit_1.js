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
        {"date" :  "2021-04-14"},
        {"available" : "t"},
        {"listings_info.host_is_superhost" : "t"},
        { "listings_info.bathrooms_text": { $not: /shared/i } }
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
        $group: {
            _id: "$listings_info.neighbourhood_cleansed",
            host_is_superhost: { $first: "$listings_info.host_is_superhost" },
            bathrooms_text: { $push: "$listings_info.bathrooms_text" },
            num_reviews: { $sum: { $cond: { if: { $isArray: "$reviews_info" }, then: { $size: "$reviews_info" }, else: 0 } } }
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
    $sort : {"num_reviews" : -1}
}])