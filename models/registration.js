const mongoose = require("mongoose")
const Schema = mongoose.Schema
const schema = new Schema({
  _id : mongoose.Types.ObjectId,
  firstName : {type:String},
  lastName : {type:String},
  email : {type:String},
  password : {type:String}
})
module.exports = mongoose.model('Register',schema)

