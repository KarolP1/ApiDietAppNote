require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

mongoose.connect(
	"mongodb+srv://KarolP:1236914789Mk@cluster0.mgvy8.mongodb.net/notes?retryWrites=true&w=majority",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const notesRoute = require("./routes/notes.js");
app.use("/api/notes", notesRoute);

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
