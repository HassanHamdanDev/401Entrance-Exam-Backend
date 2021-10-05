'use strict';

const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
    title: String,
    description: String,
    toUSD: String,
    image: String,
});

const userSchema = new mongoose.Schema({
    email: String,
    favWatchs: Array,
});

const watchModel = mongoose.model('watch', watchSchema);
const userModel = mongoose.model('user', userSchema);

module.exports = {
    watchModel,
    userModel
}