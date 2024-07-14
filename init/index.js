if(process.env.NODE_ENV  != "production"){
    require('dotenv').config();
    }
  const mongoose = require("mongoose");
  const initData = require("./data.js");
  const listing = require("../models/listing.js");
  
  const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
  // const dbUrl = process.env.ATLASDB_URL;
  
  main()
    .then(() => {
      console.log("connected to DB");
    })
    .catch((err) => {
      console.log(err);
    });
  
  async function main() {
    await mongoose.connect(MONGO_URL);
  }
  
  const initDB = async () => {
    // await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "653c82eead170c5f7fab0177",
    }));
    await listing.insertMany(initData.data);
    console.log("data was initialized");
  };
  
  initDB();
  
  