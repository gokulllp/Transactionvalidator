const express = require("express");
const cors = require("cors");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", uploadRoute);

app.get("/", (req, res) => {
    res.send("Backend Running Successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});