const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const uploadRoute = require("./routes/upload");

const app = express();

app.use(cors());
app.use(express.json());

// Serve API
app.use("/api", uploadRoute);

// Serve frontend static files from the process working directory (more reliable on hosts)
const publicDir = process.cwd();
app.use(express.static(publicDir));

// Serve test.html at the root URL (resolve from working dir)
app.get("/", (req, res) => {
    const indexPath = path.join(process.cwd(), "test.html");
    if (fs.existsSync(indexPath)) return res.sendFile(indexPath);
    return res.send("Backend Running Successfully");
});

// Download the latest cleaned CSV if present
app.get('/download', (req, res) => {
    const candidates = [
        path.join(process.cwd(), 'output', 'cleaned.csv'),
        path.join(__dirname, '..', 'output', 'cleaned.csv'),
        path.join(__dirname, '..', '..', 'output', 'cleaned.csv')
    ];

    const filePath = candidates.find(p => fs.existsSync(p));

    if (!filePath) {
        return res.status(404).send('No cleaned.csv file found');
    }

    res.download(filePath, 'cleaned.csv', err => {
        if (err) {
            console.error('Download error', err);
            if (!res.headersSent) res.status(500).send('Error downloading file');
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});