const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ejs = require('ejs');
const path = require('path');
const sendMail = require('../helpers/helper.mail');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest',
        required: [true, 'Role is required']
    }
}, {
    timestamps: true,
});

userSchema.pre('save', async function(next) {
    if(this.isModified('password'))
    {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

// static method find admin
userSchema.statics.findAdmin = function() {
    return this.find({role: 'admin'});
};

// query method find admin
userSchema.query.byRole = function(role) {
    return this.where({role});
};

userSchema.methods.verifyPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.sendWelcomeEmail = function() {
    ejs.renderFile(path.join(__dirname, '..', 'emails', 'email.welcome.ejs'), {
        user: this
    }, (err, html) => {
        if(err) return console.log(err.message);
        sendMail(this.email, 'Welcome to our Family...', html);
    });
}

module.exports = mongoose.model('User', userSchema);