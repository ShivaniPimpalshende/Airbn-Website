
const mongoose=require("mongoose");
let Schema=mongoose.Schema;

const reviewSchema=new Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true
    },
   comment:String,
  createdAt:{
    type:Date,
    default: Date.now(),
    required:true,
  },
  author:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },

});

module.exports=mongoose.model("Review",reviewSchema);