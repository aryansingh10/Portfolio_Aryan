const express = require('express');
const path = require('path');
const mongoose=require("mongoose")
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const Contact = require('../models/contactModel'); 

mongoose.connect('mongodb://localhost:27017/User-Detail', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Check for MongoDB connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

// Serve the CSS file
app.get('/app.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/app.css'));
});

app.get('/skills', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'skills.html'));
});


app.get('/projects', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/projects.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});


app.post('/submit-contact', async (req, res) => {
    try {
        // Save the form data to MongoDB
        // Assuming you have a Mongoose model named 'Contact'
        const Contact = mongoose.model('Contact');
        const newContact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        });
        await newContact.save();

        // Send a success response to the client
        res.status(200).send('Contact form submitted successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});