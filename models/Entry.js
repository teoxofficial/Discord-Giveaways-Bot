const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  giveawayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Giveaway',
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  },
  enteredAt: {
    type: Date,
    default: Date.now
  }
});

// Aynı kullanıcı aynı çekilişe birden fazla kez giremez
EntrySchema.index({ giveawayId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Entry', EntrySchema);