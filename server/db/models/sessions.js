var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SessionsSchema = new Schema({
    name: {
        type: String
    },
    userId: {
        type: String
    },
    players: {
        type: Array
    }
});

var Sessions = mongoose.model("Sessions", SessionsSchema);

module.exports = Sessions;