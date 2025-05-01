# Free Gold Investing Kit

A comprehensive website providing information about gold investments, IRAs, and 401(k) rollovers. The site includes a contact form system powered by Node.js and Express.

## Features

- Informative content about gold investments and IRAs
- Responsive design for all devices
- Contact form with email notifications
- Progressive Web App (PWA) support
- Cross-browser favicon support
- SEO optimized

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Node.js
- Express
- Nodemailer

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd free-gold-investing-kit
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your email configuration:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-specific-password
```

## Running the Project

1. Start the server:
```bash
npm start
```

2. The server will start on port 5500. Access the website at:
```
http://localhost:5500
```

## Project Structure

```
├── images/                  # Image assets
│   ├── favicon16x16px.png  # Favicons
│   ├── favicon32x32px.webp
│   └── ...                 # Other images
├── server.js               # Express server for contact form
├── package.json           # Project dependencies
├── manifest.json          # PWA manifest
├── browserconfig.xml      # Windows tile configuration
├── index.html            # Main landing page
└── various .html files   # Other content pages
```

## Contact Form Setup

The contact form uses Nodemailer to send emails. Make sure to:
1. Enable "Less secure app access" in your Gmail account, or
2. Create an App Password if using 2FA

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 and up

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Images from Unsplash
- Icons and favicons generated for cross-browser support
- Noble Gold for partnership