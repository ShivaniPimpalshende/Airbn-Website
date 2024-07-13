const listing = require("./models/listing.js");
const Review = require("./models/review");
const {listingSchema,reviewSchema}=require("./Schema.js");
const ExpressError=require("./utils/ExpressError.js");

module.exports.currUser = (req, res, next) => {
    res.locals.currUser = req.user;
    next();
};


module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","you must be logged into create listing!");
         return res.redirect("/login")
    }
    next();
};

module.exports.savedRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) =>{
    let {id} =req.params;
    let listings = await listing.findById(id);
    if(!listings.owner.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validateListing=(req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

module.exports.isReviewAuthor = async (req, res, next)=>{
    let {id, reviewId} =req.params;
    let review = await Review.findById(reviewId);

    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error", "You are not the author of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
