
const mongoose = require('mongoose');

const guitarSchema = mongoose.Schema({
  id:           { type: String, required: true },
  brand:        { type: String, required: true},
  model:        { type: String, required: true},
  year:         { type: Number },
  price:        { type: Number },
  description:  { type: String },
  category:     { type: String },
  condition:    { type: String },
  image:        { type: String }
});

module.exports = mongoose.model('Guitar', guitarSchema, 'guitars');