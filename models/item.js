const mongoose = require("mongoose");

const Schema = mongoose.Schema;
  
const ItemSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim :true,
    },
    price: {
      type: String,
      required: true
    },
    website:{
        type: String,
        required: true,

    },
    link: {
        type: String,
        required: true,
    },
    image: {
        type:String
    }
})
  const Item = mongoose.model("Item", ItemSchema)
  module.exports = Item;
