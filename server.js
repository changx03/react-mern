/*eslint no-undef: "error"*/
/*eslint-env node*/
// Uncomment the rule below when deploy
/*eslint no-console: 0*/

"use strict";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Comment = require("./model/comments");

const app = express();
const PORT = process.env.API_PORT || 3001;
const router = express.Router();

// mongo
const mongoURL = "mongodb://comment-app:comment-app@ds149954.mlab.com:49954/sunfishdb";
mongoose.Promise = global.Promise;
mongoose.connect(mongoURL, {
    useMongoClient: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log(`MongoDB is connecting to ${mongoURL}`);

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
        res.setHeader("Cache-Control", "no-cache");
        next();
    });

    router.get("/", (req, res) => {
        res.json({
            message: "API initialized!"
        });
    });

    const commentRoute = router.route("/comments");

    // get comments from db
    commentRoute.get(function (req, res) {
        Comment.find(function (err, comments) {
            if (err) {
                res.send(err);
            }

            res.json(comments);
        });
    });

    // Save comment into db
    commentRoute.post(function (req, res) {
        let comment = new Comment();
        comment.author = (req.body.author) ? req.body.author : null;
        comment.text = (req.body.text) ? req.body.text : null;

        comment.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: "Comment successfully added!"
            });
        });
    });

    // Adding a route to specific comment
    router.route("/comments/:comment_id").put(function (req, res) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                res.send(err);
            }
            comment.author = (req.body.author) ? req.body.author : null;
            comment.text = (req.body.text) ? req.body.text : null;

            // save
            comment.save(function (err) {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: "Comment has been updated."
                });
            });
        });
    }).delete(function (req, res) { // Delete
        Comment.remove({
            _id: req.params.comment_id
        }, function (err, comment) {
            if (err) {
                res.send(err);
            }
            res.json({
                message: "Comment has been deleted"
            });
        });
    });

    app.use("/api", router);

    app.listen(PORT, () => {
        console.log(`Node.js is running on http://localhost:${PORT}`);
    });
});
