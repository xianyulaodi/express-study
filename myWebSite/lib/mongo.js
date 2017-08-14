const config = require('../config');

const mongoose = require('mongoose');
const db = mongoose.connect(config.mongodb,{useMongoClient: true});

module.exports = db;

