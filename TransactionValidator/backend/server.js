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

// Try several likely locations for the frontend (accounts for Render working dir differences)
const candidatePaths = [
    path.join(process.cwd(), 'test.html'),
    path.join(__dirname, '..', 'test.html'),
    path.join(__dirname, '..', '..', 'test.html'),
    path.join(__dirname, '..', '..', '..', 'test.html')
];

let resolvedIndex = null;
for (const p of candidatePaths) {
    if (fs.existsSync(p)) {
        resolvedIndex = p;
        break;
    }
}

if (resolvedIndex) {
    // Serve static files from the index directory first
    const staticDir = path.dirname(resolvedIndex);
    app.use(express.static(staticDir));
    app.get('/', (req, res) => res.sendFile(resolvedIndex));
} else {
    // Fallback to serving from process.cwd() and a plain message if missing
    app.use(express.static(process.cwd()));
    app.get('/', (req, res) => res.send('Backend Running Successfully'));
}

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