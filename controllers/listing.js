const { query } = require("express");
const listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const baseClient = mbxGeocoding({accessToken : mapToken});
const geocodingClient = mbxGeocoding({accessToken : mapToken});

module.exports.index = async (req,res)=>{
    const allListings=await listing.find({})
     res.render("./listings/index.ejs",{allListings});
};

module.exports.renderNewform = (req,res)=>{
    res.render("listings/new.ejs")
};

module.exports.showListing= async (req,res)=>{
   const {id}=req.params;
   const listings=await listing.findById(id)
   .populate({
   path : "reviews",
   populate:{
   path:"author",
    },
  })
   .populate("owner");
  console.log("Listings:", listings);
   if(!listings){
       req.flash("error","The Listing you requested does not exit!");
       res.redirect("/listings");
   }
   
   console.log(listings);
    res.render("./listings/show.ejs",{listings});
    console.log(listings.owner);
};
  
 module.exports.createListing = async(req,res)=>{
   let response = await geocodingClient
   .forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
   })
   .send();
  
    let url = req.file.path;
    let filename = req.file.filename;
    const newlisting = new listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image = {url, filename};
    newlisting.geometry = response.body.features[0].geometry
    let savelisting= await newlisting.save();
    console.log(savelisting);
    req.flash("success","New Listing Created!");
    res.redirect("/listings");
 };

 module.exports.renderEditForm= async (req,res)=>{
    const { id } = req.params;
       
       const listings = await listing.findById(id);
       if (!listings) {
           req.flash("error", "Cannot find that listing!");
           return res.redirect("/listings");
       }
           req.flash("success","Listing Edited!");
           let originalImageUrl=listings.image.url;
           originalImageUrl= originalImageUrl.replace("/upload","/upload/w_250");
           res.render("listings/edit.ejs",{listings, originalImageUrl});
       }

 module.exports.updateListing = async (req,res)=>{
    let {id} =req.params;
    let listings=await listing.findByIdAndUpdate(id,{...req.body.listing});
    if( typeof req.file !=="undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listings.image={url,filename};
    await listings.save();
    }
     req.flash("success","Listing updated!");
     res.redirect(`/listings/${id}`);
  }; 

 

 
  
module.exports.destroyListing = async (req,res)=>{
let {id}=req.params;
  const Deletelisting= await listing.findByIdAndDelete(id);
  console.log(Deletelisting);
  req.flash("success","Listing Deleted!");
  res.redirect("/listings");
};



module.exports.filter = async(req,res,next)=>{
    // let {q} = req.query;
    let {id} = req.params;
    let allListings = await listing.find({category: id});
    // console.log(allListing)
    if(allListings.length != 0){
        res.render("listings/index.ejs", { allListings });
    }else{
        req.flash("error","Listings is not here")
        res.redirect("/listings")
    }
}

module.exports.search = async (req, res) => {
    let { title } = req.query;
  
    const allListings = await listing.find({ title });
    res.render("./listings/index.ejs", { allListings });
};