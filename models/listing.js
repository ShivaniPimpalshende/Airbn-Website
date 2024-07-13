const mongoose=require("mongoose");
const Review = require("./review.js");
let Schema=mongoose.Schema;

let listingSchema=new Schema({
      title:{
        type: String,
        required: true
      },
      description:String,
      image:{
         filename: String,
         url: String,
      },
      price:Number,
      location:String,
      country:String,
      reviews:[{
         type: Schema.Types.ObjectId,
         ref:"Review",
      }],
      owner:{
         type: Schema.Types.ObjectId,
         ref:"User",
      },
     geometry:{
      type: {
      type : String, //don't do `{location :{ type: String}}`
      enum : ['Point'],  //`location.type` must be `Point`
      required:true
     },
     coordinates: {
      type: [Number],
      required: true
     }
   }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
      await Review.deleteMany({_id:{$in:listing.reviews}});
   }
})

let listing=mongoose.model("listing",listingSchema);
module.exports=listing;