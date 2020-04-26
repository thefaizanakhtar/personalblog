const mongoose = require("mongoose")
const Schema = mongoose.Schema
const schema = new Schema({
  _id : mongoose.Types.ObjectId,
  email : {type:String},
  name : {type:String},
  message : {type:String}
})
module.exports = mongoose.model('contactus',schema)