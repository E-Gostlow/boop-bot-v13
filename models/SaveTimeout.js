const mongoose = require('mongoose');

const SaveTimeoutSchema = new mongoose.Schema({
	timeoutEnd: { type: Number },
});

module.exports = mongoose.model('SaveTimeout', SaveTimeoutSchema);
