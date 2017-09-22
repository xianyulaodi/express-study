const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;
const db = require('../lib/mongo');

const CollectSchema = new mongoose.Schema({
    user_id: { type: ObjectId }, 
    article_id: { type: ObjectId },
    author_id: { type: ObjectId },
    title: { type: String },
    create_at:{type:Date, default:Date.now}
});

CollectSchema.index({user_id:1},{create_at:1});
CollectSchema.index({article_id:1});

const Collect = db.model('Collect',CollectSchema);

module.exports = Collect;
