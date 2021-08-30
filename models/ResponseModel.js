const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    question: { type: String, required: true, trim: true},
    answer: [String]
});

const UserResponseSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true},
    response: [ResponseSchema]
});

var Response = mongoose.model('Response', UserResponseSchema);
module.exports = Response;