const mongoose = require('mongoose');

const SentDmLogSchema = new mongoose.Schema({
	guildID: { type: String },
	userID: { type: String },
	userTag: { type: String },
	messages: { type: [Object] },
});

module.exports = mongoose.model('SentDmLog', SentDmLogSchema);
