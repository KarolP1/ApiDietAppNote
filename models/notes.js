const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	value: {
		type: String,
		required: true,
	},
	noteDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

module.exports = mongoose.model("Subscriber", notesSchema);
