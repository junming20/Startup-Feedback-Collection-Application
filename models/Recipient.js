const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
const {Schema} = mongoose;

//avoid duplicate votes, after false flip to true, we will no longer count
//your votes
const recipientSchema = new Schema({
  email : String,
  responded : {type : Boolean, default : false}
});

module.exports = recipientSchema;


// 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
