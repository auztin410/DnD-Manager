var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DmSchema = new Schema({
    name: {
        type: String
    },
    userId: {
        type: String
    },
    code: {
        type: String
    },
    players: {
        type: Array
    }
});

var Dm = mongoose.model("Dm", DmSchema);

module.exports = Dm;