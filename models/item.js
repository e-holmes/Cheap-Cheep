const mongoose = require("mongoose");

const Schema = mongoose.Schema;
  
const ItemSchema = new Schema({
    name:{
        type: String,
        reuired: true,
        trim :true,
    },
    price: {
      type: Number,
       min:[1, "price is require"] ,
       max : [255]
    },
    website:{
        type: String,
        reuired: true,

    },
    link :{
        type: Boolean,
        reuired: true,

    },
    searchTerm:{
        type:String,
    }
})
  const Item = mongoose.model("Item", ItemSchema)
  module.exports = Item;
