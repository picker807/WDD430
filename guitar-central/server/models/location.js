
const mongoose = require('mongoose');

const locationSchema = mongoose.Schema({
  id: { type: String, required: true },
  storeName: {type: String, required: true},
  address: { type: String },
  city: { type: String },
  state: { type: String},
  zipCode: {type: String },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guitar'}]
});

module.exports = mongoose.model('Location', locationSchema, 'stores');