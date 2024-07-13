const mongoose=require("mongoose");
const initData=require("./data.js")
const listing=require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/Wanderlust";
main().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err)
});


async function main(){
    await mongoose.connect(MONGO_URL);
};

const initDB= async ()=>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj, owner:"6688d314d45627d5b229c3be"}))
    await listing.insertMany(initData.data);
    console.log("data was initialized");
};
initDB();