const express = require('express');
const app = express();
const connectDB = require('./app/v1/config/config.db');
const fileUpload = require('express-fileupload');
const auth = require('./app/v1/middlewares/middleware.auth');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(fileUpload());
app.use(express.static('public'));

app.use('/api/v1/auth', require('./app/v1/routes/route.auth'));

app.use(auth);// write this code after auth route because at login time we can't need token


app.use('/api/v1/users', require('./app/v1/routes/route.user'));
app.use('/api/v1/books', require('./app/v1/routes/route.book'));
app.use('/api/v1/categories', require('./app/v1/routes/route.category'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});