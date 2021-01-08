const mongoose = require('mongoose');
// line 3 is equal to const {Schema} = mongoose;
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleID : String,
  credits : { type : Number, default : 0}
});

mongoose.model('users', userSchema);
