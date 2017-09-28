/*eslint no-undef: "error"*/
/*eslint-env node*/
// Uncomment the rule below when deploy
/*eslint no-console: 0*/

"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Cache-Control", "no-cache");
    next();
});

const router =express.Router();
router.get("/", (req, res) => {
    res.json({ message: "API initialized!"});
});
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Node.js is running on http://localhost:${PORT}`);
});
