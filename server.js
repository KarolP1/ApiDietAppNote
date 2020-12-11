require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT || 3001;
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/notes";

app.use(cors());
app.use(morgan("dev"));

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());

const notesRoute = require("./routes/notes.js");
const userRoute = require("./routes/user.js");
app.use("/api/notes", notesRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => console.log(`Server Started on port: ${PORT}`));
