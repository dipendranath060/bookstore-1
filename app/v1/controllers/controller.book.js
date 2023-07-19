const Book = require('../models/model.book');
const fileUploadHelper = require('../helpers/helper.file');

exports.index = async (req, res) => {
    try {
        // const books = await Book.find().populate('category', 'name');// this line get only name of category
        // const books = await Book.findActive();

        let books = await Book.find().populate('category', ['name', 'status']); //this line get name and status of category using array
        // books = books.filter(book => book.category.status === 'active');

        res.json({
            status: 'success',
            data: books,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.store = async (req, res) => {
    try {
        const file = req.files?.image;
        const image = await fileUploadHelper.uploadFile(file, 'thumbnail');
        const book = new Book({...req.body, slug: req.body.title, image});
        await book.save();
        res.status(201).json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.show = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('category', 'name');
        res.json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.destroy = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            data: book,
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.update = async (req, res) => {
    try{
        const newBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: 'success',
            data: newBook,
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}