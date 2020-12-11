const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	title: { type: String, required: true },
	value: { type: String, required: true },
	owner: { type: String, required: true },
});

module.exports = mongoose.model("Note", noteSchema);
