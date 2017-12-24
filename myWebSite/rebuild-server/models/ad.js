const Ad = require('../lib/mongo').Ad

module.exports = {

    create: function create(data) {
        return Ad.create(data).exec()
    },

    removeAd: function removeAd(ad_id) {
        return Ad.remove({ _id: ad_id }).exec()
    },

    getAdByQuery: function getAdByQuery(query) {
        return Ad.find(query).exec()
    },

    getAdById: function getAdById(ad_id) {
        return Ad.findOne({ _id: ad_id }).exec()
    },

    updateAd: function updateAd(ad_id, data) {
        return Ad.update({ _id: ad_id }, { $set: data }).exec()
    },
}
