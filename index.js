const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

// Express Settings
const app = express();
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Connect to MongoDB using the MONGO_URI from .env
const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB', mongoURI);
        // Start your server after successfully connecting to MongoDB
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Controllers & Routes
app.use('/places', require('./controllers/places.js'));

app.get('/', (req, res) => {
    res.render('home.jsx');
});

app.get('*', (req, res) => {
    res.render('error404.jsx');
});
