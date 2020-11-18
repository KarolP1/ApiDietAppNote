require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/notes";
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const notesRoute = require("./routes/notes.js");
app.use("/api/notes", notesRoute);

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
