const express = require("express");
const cors = require("cors");
const path = require("path");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

// Serve API
app.use("/api", uploadRoute);

// Serve frontend static files from the repository root
const publicDir = path.join(__dirname, "..", ".."); // repo root
app.use(express.static(publicDir));

// Serve test.html at the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(publicDir, "test.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});