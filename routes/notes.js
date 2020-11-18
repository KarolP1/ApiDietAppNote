const express = require("express");
const router = express.Router();
const Notes = require("../models/notes");

// Getting all
router.get("/", async (req, res) => {
	try {
		const notes = await Notes.find();
		res.json(notes);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Getting One
router.get("/:id", getNote, (req, res) => {
	res.json(res.notes);
});

// Creating one
router.post("/", async (req, res) => {
	const notes = new Notes({
		title: req.body.title,
		value: req.body.value,
	});
	try {
		const newNotes = await notes.save();
		res.status(201).json(newNotes);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Updating One
router.patch("/:id", getNote, async (req, res) => {
	if (req.body.title != null) {
		res.notes.title = req.body.title;
	}
	if (req.body.value != null) {
		res.notes.value = req.body.value;
	}
	res.notes.noteDate = Date.now();
	try {
		const updatedNotes = await res.notes.save();
		res.json(updatedNotes);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Deleting One
router.delete("/:id", getNote, async (req, res) => {
	try {
		await res.notes.remove();
		res.json({ message: "Notatka usunięta" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getNote(req, res, next) {
	let notes;
	try {
		notes = await Notes.findById(req.params.id);
		if (notes == null) {
			return res.status(404).json({
				message: "Nie można znaleść notatki... Być może została już usunięta",
			});
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.notes = notes;
	next();
}

module.exports = router;
