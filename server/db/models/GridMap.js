var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GridMapSchema = new Schema({
    name: {
        type: String
    },
    sessionId: {
        type: String
    },
    grid: {
        type: Array
    }
});

var GridMap = mongoose.model('GridMap', GridMapSchema);

module.exports = GridMap;