const mongoose = require('mongoose');
const blackspotSchema = new mongoose.Schema({
    state: String,
    roadNo: String,
    locationDescription: String,
    policeStation: String,
    landmarks: String,
    blackspotId: String,
    location: {
        type: {
          type: String,
          enum: ['Point'],
        },
        coordinates: [Number],
    },
    blackspotType: String,
    district: String,
    chainage_from: Number,
    chainage_to: Number,
    site_images:[String],
    comments:[String],
    isQuest:[Boolean],
    isQuestOperational:[Boolean],
    commentsOperational:[String],
});
blackspotSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('SiteInvestigation', blackspotSchema);