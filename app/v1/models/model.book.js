const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, 'Slug is required'],
        unique: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        min: [8, 'ISBN must be greater than or equal to 8 characters'],
        max: [13, 'ISBN must be less than or equal to 13 characters'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity must be greater than or equal to 0'],
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    }
}, {
    timestamps: true,
});


bookSchema.statics.findActive = function() {
    return this.find().populate({
        path: 'category',
        match: {status: 'active'},
    });
};

bookSchema.pre('save', function(next) {
    if (!this.isModified('title')) return next();
    this.slug = slugify(this.title);
    next();
})


module.exports = mongoose.model('Book', bookSchema);