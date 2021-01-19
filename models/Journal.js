const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    id: {
        type: String,
        required:true
    },
    content: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Journals = mongoose.model('Journal', journalSchema);

module.exports = {Journals, journalSchema};