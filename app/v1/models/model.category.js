const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
    }
});

module.exports = mongoose.model('Category', categorySchema);