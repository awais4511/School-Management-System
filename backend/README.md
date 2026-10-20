# Hospital Management System - Backend

A RESTful API backend for a Hospital Management System built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **User Authentication**: Signup and login with JWT tokens
- **Role-Based Access**: Support for Student, Teacher, Parent, and Administrator roles
- **MongoDB Integration**: MongoDB Atlas for cloud database storage
- **Password Security**: Bcrypt hashing for secure password storage
- **CORS Enabled**: Frontend and backend communication
- **ES6 Modules**: Modern JavaScript module syntax
- **Error Handling**: Comprehensive error handling and validation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database)

## 🔧 Installation

1. **Clone the repository** (if applicable)
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` file and add your MongoDB Atlas URI and JWT secret:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 🏃 Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)
- `POST /api/auth/logout` - Logout user (requires token)

### Health Check
- `GET /api/health` - Server health status

## 🔐 Request Examples

### Signup
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "role": "Student"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get Profile (Protected Route)
```bash
GET /api/auth/profile
Authorization: Bearer <token>
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── authController.js  # Authentication logic
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verification & authorization
│   ├── models/
│   │   └── User.js            # User schema
│   ├── routes/
│   │   └── authRoutes.js      # Auth endpoints
│   └── server.js              # Main server file
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
├── package.json               # Dependencies
└── README.md                  # Documentation
```

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port (default: 5000) |
| NODE_ENV | Environment (development/production) |
| MONGODB_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT signing |
| JWT_EXPIRE | Token expiration time (default: 7d) |
| FRONTEND_URL | Frontend URL for CORS |

## 🛡️ Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication
- ✅ CORS protection
- ✅ Input validation
- ✅ Error handling
- ✅ Token-based authorization

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB Atlas cluster is active
- Verify connection string in .env
- Ensure your IP address is whitelisted in MongoDB Atlas

### JWT Token Errors
- Token must be sent in Authorization header
- Format: `Authorization: Bearer <token>`
- Token expires after 7 days by default

### CORS Issues
- Check FRONTEND_URL in .env
- Ensure frontend URL matches exactly

## 📦 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **dotenv**: Environment variables
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: Cross-Origin Resource Sharing
- **nodemon**: Development server with auto-reload

## 🚀 Next Steps

1. Set up MongoDB Atlas account
2. Create a cluster and database
3. Update .env with connection string
4. Run `npm run dev`
5. Test endpoints with Postman or similar tools
6. Integrate with frontend application

## 📞 Support

For issues or questions, please check the documentation or contact the development team.

---

**Created**: May 2026
**Last Updated**: May 2026
