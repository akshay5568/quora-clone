const mongoose = require('mongoose');

const qouraSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const Qoura = mongoose.model('Qoura', qouraSchema);
module.exports = Qoura;