const config = require('../config');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = mongoose.connect(config.mongodb,{useMongoClient: true});

module.exports = db;

