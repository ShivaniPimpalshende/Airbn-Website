const Review=require("../models/review.js");
const listing=require("../models/listing.js");

 module.exports.createReview = async(req,res)=>{
    let listings=await listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author = req.user._id;
    
       listings.reviews.push(newReview);
       await newReview.save();
    
       await listings.save();
       req.flash("success","Review Added!");
    
       res.redirect(`/listings/${listings._id}`);
};

module.exports.destroyReview  = async(req,res)=>{
    let {id, reviewId}=req.params;

    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findById(reviewId);
    req.flash("success","Review Deleted!");

    res.redirect(`/listings/${id}`);
};