const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const listing=require("../models/listing.js");
const {isLoggedIn, isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer= require("multer");
const {storage} = require("../clouldConfig.js");
const upload = multer({storage}); 

router.get("/filter/:id",wrapAsync(listingController.filter));
router.get("/search", wrapAsync(listingController.search));


router.route("/")
.get(wrapAsync(listingController.index)) //Index Route
.post(isLoggedIn, 
upload.single('listing[image]'),
validateListing,
wrapAsync(listingController.createListing)); //create Route

//New Route
 router.get("/new", isLoggedIn,listingController.renderNewform,()=>{
 });
    
router.route("/:id")
.get(wrapAsync(listingController.showListing))  //show route
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing)) //update route
.delete(isLoggedIn,  wrapAsync(listingController.destroyListing)); //delete route

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner , wrapAsync(listingController.renderEditForm));
router.get("/search", wrapAsync(listingController.search));



 module.exports=router;