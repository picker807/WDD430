const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
  "maxGuitarId": { type: Number },
  "maxLocationId": { type: Number },
});

module.exports = mongoose.model('Sequence', sequenceSchema, 'sequence');