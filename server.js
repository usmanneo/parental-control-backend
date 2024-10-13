const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI || 'your-mongodb-uri-here';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('MongoDB connection error:', error));

// SMS Schema
const smsSchema = new mongoose.Schema({
    sender: String,
    message: String,
    timestamp: String
});
const Sms = mongoose.model('Sms', smsSchema);

// Notification Schema
const notificationSchema = new mongoose.Schema({
    app: String,
    title: String,
    message: String
});
const Notification = mongoose.model('Notification', notificationSchema);

// SMS POST Route
app.post('/api/sms', async (req, res) => {
    console.log("SMS endpoint hit, request body:", req.body);
    try {
        const smsData = new Sms(req.body);
        await smsData.save();
        console.log('SMS data saved:', smsData);
        res.status(200).json({ message: 'SMS data received and saved successfully!' });
    } catch (error) {
        console.error('Error saving SMS data:', error);
        res.status(500).json({ message: 'Failed to save SMS data' });
    }
});

// Notification POST Route
app.post('/api/notifications', async (req, res) => {
    console.log("Notification endpoint hit, request body:", req.body);
    try {
        const notificationData = new Notification(req.body);
        await notificationData.save();
        console.log('Notification data saved:', notificationData);
        res.status(200).json({ message: 'Notification data received and saved successfully!' });
    } catch (error) {
        console.error('Error saving notification data:', error);
        res.status(500).json({ message: 'Failed to save notification data' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
