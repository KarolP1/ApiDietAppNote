const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");

const Note = require("../models/notes");
//post note
router.post("/:userID/", checkAuth, (req, res, next) => {
	const note = new Note({
		_id: new mongoose.Types.ObjectId(),
		title: req.body.title,
		value: req.body.value,
		owner: req.params.userID,
	});
	note
		.save()
		.then((result) => {
			res.status(201).json({
				message: "Created note successfully",
				createdNote: {
					title: result.title,
					value: result.value,
					_id: result._id,
					owner: result.owner,
					request: {
						type: "GET",
						url: "http://localhost:3000/products/" + result._id,
					},
				},
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

//get all notes

router.get("/:userID", checkAuth, (req, res, next) => {
	Note.find({ owner: req.params.userID }).then((allUserNotes) => {
		console.log(allUserNotes);
		res.status(200).send(allUserNotes);
	});
});

//get one note

router.get("/:userID/:noteID", checkAuth, (req, res, next) => {
	Note.find({ owner: req.params.userID, _id: req.params.noteID }).then(
		(singleNote) => {
			res.status(200).send(singleNote);
		}
	);
});

//update note

router.patch("/:userID/:noteID", checkAuth, async (req, res, next) => {
	const id = req.params.noteID;
	const owner = req.params.userID;

	await Note.findOneAndUpdate({ _id: id, owner: owner }, req.body, {
		useFindAndModify: false,
		new: true,
	}).then((result) => {
		res.send(result);
	});

	// await Note.findByIdAndUpdate(id, req.body).then((result) => {
	// 	res.status(200).send(result);
	// });
});

router.delete("/:userID/:noteID", checkAuth, (req, res, next) => {
	const id = req.params.noteID;
	Note.findByIdAndDelete(id)
		.then((note) => {
			res.send(note);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({
				error: err,
			});
		});
});

module.exports = router;
