var Sequence = require('../models/sequence');

var maxGuitarId;
var maxLocationId;
var sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      this.sequenceId = sequence._id;
      this.maxGuitarId = sequence.maxGuitarId;
      this.maxLocationId = sequence.maxLocationId;
    } catch (err) {
      console.error('Error initializing SequenceGenerator:', err);
      throw err;
    }
  },

  async nextId(collectionType) {
    // Ensure the generator is initialized
    if (!this.sequenceId) {
      await this.init();
    }

    let updateObject = {};
    let nextId;

    switch (collectionType) {
      case 'guitars':
        nextId = ++this.maxGuitarId;
        updateObject = { maxGuitarId: this.maxGuitarId };
        break;
      case 'stores':
        nextId = ++this.maxLocationId;
        updateObject = { maxLocationId: this.maxLocationId };
        break;
      default:
        throw new Error('Invalid collection type');
    }

    await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject });
    return nextId.toString();
  }
};

module.exports = sequenceGenerator;