# PetMart Royale - E-Commerce Platform for Pet Supplies

A full-stack e-commerce platform for pet supplies, built with the MERN stack. Features user auth, cart, payments, admin dashboard, image uploads, and voice search.

## 🚀 Tech Stack

### Frontend (Client)
- React 19 with Vite
- Redux Toolkit for state management
- React Router for navigation
- TailwindCSS for styling
- Radix UI for accessible components
- Axios for API requests
- React Toastify for notifications
- Recharts for data visualization
- React Speech Recognition for voice features

### Backend (Server)
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image storage
- Razorpay for payment processing
- Bcrypt for password hashing

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

## 🔧 Environment Variables

### Server (.env)
Create a `.env` file in the server directory (sample env file is provided)

### Client (.env)
Create a `.env` file in the client directory (sample env file is provided)

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd ECommerce
```

2. Install dependencies:

For the server:
```bash
cd server
npm install
```

For the client:
```bash
cd client
npm install
```

3. Start the development servers:

For the server (in the server directory):
```bash
npm run dev
```

For the client (in the client directory):
```bash
npm run dev
```

The server will run on `http://localhost:5000` and the client on `http://localhost:5173`

## 📁 Project Structure

### Server
```
server/
├── config/         # Configuration files (database, cloudinary)
├── controllers/    # Route controllers
├── middlewares/    # Custom middlewares
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
└── server.js       # Entry point
```

### Client
```
client/
├── public/         # Static files
├── src/           # Source files
│   ├── components/ # React components
│   ├── pages/     # Page components
│   ├── store/     # Redux store
│   ├── utils/     # Utility functions
│   └── App.jsx    # Root component
└── vite.config.js # Vite configuration
```

## 🔑 Features

- User Authentication (Signup, Login, Logout)
- Product Management (CRUD operations)
- Shopping Cart
- Order Management
- Address Management
- Payment Integration (Razorpay)
- Image Upload (Cloudinary)
- Search Functionality
- Rating & Review
- Admin Dashboard
- Responsive Design


## 🔒 Security Features

- JWT Authentication
- Password Hashing
- CORS Protection
- Secure Cookie Handling
- Environment Variables
- File Upload Security

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Pradeep Singh

## 🙏 Acknowledgments

- All the open-source libraries and tools used in this project
- The development community for their support and resources 
