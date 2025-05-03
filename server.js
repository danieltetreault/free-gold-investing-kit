require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5502;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Static file serving with cache control
app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filePath) => {
    // Set long cache for images and other static assets
    if (filePath.match(/\.(jpg|jpeg|png|webp|gif|ico|css|js)$/)) {
      // Cache for 1 week (604800 seconds)
      res.setHeader('Cache-Control', 'public, max-age=604800');
    } else {
      // Default cache for HTML files - shorter time
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Configure email transporter using environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    },
    debug: true, // Show debug output
    logger: true // Log information about the mail
});

// Verify transporter configuration
transporter.verify(function(error, success) {
    if (error) {
        console.error('Transporter verification failed:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

// Handle form submission
app.post('/send-email', (req, res) => {
    console.log('Received form submission:', req.body);
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.CONTACT_EMAIL || 'contact@example.com',
        subject: `New Contact Form Message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    console.log('Attempting to send email with options:', mailOptions);
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent successfully:', info.response);
            res.redirect('/thank-you.html');
        }
    });
});

// Serve static files
app.get('/:page.html', (req, res) => {
    res.sendFile(path.join(__dirname, req.params.page + '.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
