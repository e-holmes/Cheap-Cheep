

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    listName: {
        type: String,
        required: true,

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    Items: [{
        type: Schema.Types.ObjectId,
        ref: "Item"
    }]
    
})
const List = mongoose.model("List", ListSchema);

module.exports = List;

