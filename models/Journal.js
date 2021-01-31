const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const journalSchema = new Schema({
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
    googleId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

const Journals = mongoose.model('Journal', journalSchema);

module.exports = {Journals, journalSchema};