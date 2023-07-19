const mongoose = require('mongoose');
require('dotenv').config();


module.exports = async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('Database connected successfully...');
    }catch(error){
        console.log(error.message);
        process.exit(1);
    }
}