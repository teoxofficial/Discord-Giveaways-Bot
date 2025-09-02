const mongoose = require('mongoose');

const GiveawaySchema = new mongoose.Schema({
  messageId: {
    type: String,
    required: true,
    unique: true
  },
  channelId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  },
  hostId: {
    type: String,
    required: true
  },
  prize: {
    type: String,
    required: true
  },
  winnerCount: {
    type: Number,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  ended: {
    type: Boolean,
    default: false
  },
  winners: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Giveaway', GiveawaySchema);