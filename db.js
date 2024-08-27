const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI; // Ensure this is correctly loaded
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        await mongoose.connect(mongoURI, {
            
        });
        console.log('MongoDB connected successfully.');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
