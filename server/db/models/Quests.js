var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuestsSchema = new Schema({
    title: {
        type: String
    },
    questGroup: {
        type: Boolean
    },
    group: {
        type: String
    },
    part: {
        type: Number
    },
    startNPC: {
        type: String
    },
    startLocation: {
        type: String
    },
    endNPC: {
        type: String
    },
    endLocation: {
        type: String
    },
    description: {
        type: String
    },
    reward: {
        type: Array
    },
    experience: {
        type: Number
    },
    completed: {
        type: Boolean
    },
    sessionId: {
        type: String
    }
});

var Quests = mongoose.model("Quests", QuestsSchema);

module.exports = Quests;