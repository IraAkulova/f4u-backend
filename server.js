const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

const { contactsRouter, reviewsRouter } = require("./api");
app.use("/api/reviews", reviewsRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
    const { status = 500, message = "Server error" } = err;
    res.status(status).json({
        message,
    });
});

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3000;
const connection = mongoose.connect(DB_HOST);

connection
    .then(() => {
        app.listen(PORT, function () {
            console.log(PORT);
            console.log(`Database connection successful`);
        });
    })
    .catch((err) => {
        console.log(`Server not running. Error message: ${err.message}`);
        process.exit(1);
    });