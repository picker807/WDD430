var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId = null;

const sequenceGenerator = {
  async init() {
    try {
      const sequence = await Sequence.findOne({}).exec();
      if (!sequence) {
        throw new Error('Sequence not found');
      }
      this.sequenceId = sequence._id;
      this.maxDocumentId = sequence.maxDocumentId;
      this.maxMessageId = sequence.maxMessageId;
      this.maxContactId = sequence.maxContactId;
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
      case 'documents':
        nextId = ++this.maxDocumentId;
        updateObject = { maxDocumentId: this.maxDocumentId };
        break;
      case 'messages':
        nextId = ++this.maxMessageId;
        updateObject = { maxMessageId: this.maxMessageId };
        break;
      case 'contacts':
        nextId = ++this.maxContactId;
        updateObject = { maxContactId: this.maxContactId };
        break;
      default:
        throw new Error('Invalid collection type');
    }

    await Sequence.updateOne({ _id: this.sequenceId }, { $set: updateObject });
    return nextId;
  }
};

module.exports = sequenceGenerator;