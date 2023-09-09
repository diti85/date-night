//import mongoose
const mongoose = require("mongoose");
//create a mongoose schema
const Schema = mongoose.Schema;
//create a new schema for places
const placeSchema = new Schema({
    name: String,
    location: String,
    firstTime: String,
    categories: Array,
    rating: Number,
    reviews: String,
});    

module.exports = mongoose.model('Place', placeSchema);