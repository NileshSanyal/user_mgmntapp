var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var deleted = [true, false];
var active = [true, false];
var status = ["Active", "Inactive"];

var UserSchema = new Schema({

  first_name: { type: String, default: '' },
  last_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  password: { type: String, default: '' },
  profile_pic: { type: String, default: '' },

  status: { type: String, default: 'Active', enum: status },
  isDeleted: { type: Boolean, default: false, enum: deleted }

});

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', UserSchema);