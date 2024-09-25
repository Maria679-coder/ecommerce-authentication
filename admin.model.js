const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, ' name is required field']
  },
  email: {
    type: String,
    required:  [true, 'email is required field'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required field']
  },
  phone: {
    type: String,
    required: [true, 'phone is required field']
  },
  image: {
    type: String,
    required: [true, 'image is required field']
  }
});

const adminModel = mongoose.model('Admin', adminSchema);

module.exports = adminModel
