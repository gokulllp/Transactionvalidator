const express = require("express");
const multer = require("multer");
const fs = require("fs");
const csv = require("csv-parser");
const { Parser } = require("json2csv");

const validatePhone = require("../validators/phoneValidator");
const validateDate = require("../validators/dateValidator");

const router = express.Router();

const upload = multer({
    dest: "uploads/"
});

router.post("/upload", upload.single("file"), (req, res) => {
    console.log("UPLOAD API HIT");

    try {

        if (!req.file) {
            return res.status(400).json({
                error: "No file uploaded"
            });
        }

        console.log("=================================");
        console.log("Uploaded File:", req.file.originalname);
        console.log("File Path:", req.file.path);
        console.log("=================================");

        const results = [];

        fs.createReadStream(req.file.path)
            .pipe(csv())

            .on("data", (row) => {

                console.log("Row Read:", row);

                row.phoneValid =
                    validatePhone(
                        row.phone,
                        row.country
                    );

                row.dateValid =
                    validateDate(
                        row.order_date
                    );

                console.log(
                    "Phone Valid:",
                    row.phoneValid,
                    "| Date Valid:",
                    row.dateValid
                );

                results.push(row);

            })

            .on("end", () => {

                console.log("=================================");
                console.log("CSV Reading Completed");
                console.log("Total Rows:", results.length);

                const validRows = results.filter(
                    r =>
                    r.phoneValid &&
                    r.dateValid
                );

                console.log(
                    "Valid Rows:",
                    validRows.length
                );

                console.log(
                    "Output Folder Exists:",
                    fs.existsSync("output")
                );

                if (validRows.length === 0) {

                    return res.json({
                        totalRows: results.length,
                        validRows: 0,
                        message:
                        "No valid rows found"
                    });

                }

                const parser = new Parser();

                const csvOutput =
                    parser.parse(validRows);

                fs.writeFileSync(
                    "output/cleaned.csv",
                    csvOutput
                );

                console.log(
                    "cleaned.csv created successfully"
                );

                res.json({
                    totalRows: results.length,
                    validRows: validRows.length,
                    output: "cleaned.csv"
                });

            })

            .on("error", (err) => {

                console.error(
                    "CSV Error:",
                    err
                );

                res.status(500).json({
                    error: err.message
                });

            });

    }
    catch (err) {

        console.error(
            "Server Error:",
            err
        );

        res.status(500).json({
            error: err.message
        });

    }

});

module.exports = router;