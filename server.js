const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Initialize express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection string (replace <db_password> with your actual password)
const mongoUri = 'mongodb+srv://pashaup443:God112256@cluster0.qeqij.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('MongoDB connection error:', error));

// Define a Mongoose schema and model for SMS data
const smsSchema = new mongoose.Schema({
    sender: String,
    message: String,
    timestamp: String
});
const Sms = mongoose.model('Sms', smsSchema);

// Define a Mongoose schema and model for Notification data
const notificationSchema = new mongoose.Schema({
    app: String,
    title: String,
    message: String
});
const Notification = mongoose.model('Notification', notificationSchema);

// Route to receive and save SMS data
app.post('/api/sms', async (req, res) => {
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

// Route to receive and save Notification data
app.post('/api/notifications', async (req, res) => {
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
