/*eslint-env node*/
/*eslint linebreak-style: ["error", "windows"]*/
"use strict";

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let CommentSchema = new Schema({
    author: String,
    text: String
});

module.exports = mongoose.model("Comment", CommentSchema);
