const Category = require('../models/model.category');

exports.index = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({
            status: 'success',
            data: categories,
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.store = async (req, res) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.status(201).json({
            status: 'success',
            data: category,
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.show = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.json({
            status: 'success',
            data: category,
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.destroy = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        res.json({
            status: 'success',
            data: category,
        });
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

exports.update = async (req, res) => {
    try{
        const newCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({
            status: 'success',
            data: newCategory,
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}