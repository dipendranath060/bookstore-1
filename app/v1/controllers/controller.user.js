const User  = require('../models/model.user');

exports.store = async (req, res) => {
    try {
        const user = await User.create({...req.body, role: 'admin'});
        user.sendWelcomeEmail();
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.index = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getAdmin = async (req, res) => {
    try {
        // const user = await User.find({role: 'admin'});
        // const user = await User.findAdmin();
        const user = await User.find().byRole('admin');
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getGuest = async (req, res) => {
    try {
        const user = await User.find({role: 'guest'});
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}