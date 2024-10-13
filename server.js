const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle SMS data
app.post('/api/sms', (req, res) => {
    const smsData = req.body;
    console.log('SMS data received:', smsData);
    res.status(200).json({ message: 'SMS data received successfully!' });
});

// Route to handle Notification data
app.post('/api/notifications', (req, res) => {
    const notificationData = req.body;
    console.log('Notification data received:', notificationData);
    res.status(200).json({ message: 'Notification data received successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
