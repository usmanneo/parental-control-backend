// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize the app and set the port
const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// MongoDB connection string (replace 'myDatabaseName' with your actual database name)
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://pashaup443:God112256@cluster0.qeqij.mongodb.net/myDatabaseName?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Define the SMS Schema
const smsSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: String, required: true }
});

// Define the Notification Schema
const notificationSchema = new mongoose.Schema({
    app: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true }
});

// Create Mongoose models for SMS and Notifications
const Sms = mongoose.model('Sms', smsSchema);
const Notification = mongoose.model('Notification', notificationSchema);

// SMS POST Route
app.post('/api/sms', async (req, res) => {
    console.log("SMS endpoint hit, request body:", req.body);

    // Validate incoming request data
    const { sender, message, timestamp } = req.body;
    if (!sender || !message || !timestamp) {
        return res.status(400).json({ message: 'Missing required fields: sender, message, timestamp' });
    }

    try {
        // Create a new SMS entry and save it to the database
        const smsData = new Sms(req.body);
        await smsData.save();
        console.log('SMS data saved:', smsData);
        res.status(200).json({ message: 'SMS data received and saved successfully!' });
    } catch (error) {
        console.error('Error saving SMS data:', error);
        res.status(500).json({ message: 'Failed to save SMS data', error: error.message });
    }
});

// Notification POST Route
app.post('/api/notifications', async (req, res) => {
    console.log("Notification endpoint hit, request body:", req.body);

    // Validate incoming request data
    const { app, title, message } = req.body;
    if (!app || !title || !message) {
        return res.status(400).json({ message: 'Missing required fields: app, title, message' });
    }

    try {
        // Create a new Notification entry and save it to the database
        const notificationData = new Notification(req.body);
        await notificationData.save();
        console.log('Notification data saved:', notificationData);
        res.status(200).json({ message: 'Notification data received and saved successfully!' });
    } catch (error) {
        console.error('Error saving notification data:', error);
        res.status(500).json({ message: 'Failed to save notification data', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
