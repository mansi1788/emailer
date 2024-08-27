require('dotenv').config(); // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const { sendEmail } = require('./emailservice'); // Import sendEmail

const app = express();
const port = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'frontend')));

// Route to send an email
app.post('/send-email', async (req, res) => {
    const { from, to, subject, text } = req.body; // Include 'from' field

    try {
        const result = await sendEmail(from, to, subject, text); // Pass 'from'
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
