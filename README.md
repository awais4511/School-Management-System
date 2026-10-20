# School Management System

A full-stack School Management System built with **React, Vite, Node.js, Express, and MongoDB**. The application is organized into a frontend client and a REST API backend for managing school users and academic workflows.

## Features

The project contains frontend pages, API services, backend routes, controllers, and MongoDB models for areas including:

- Authentication and user profiles
- Role-based access for administrators, teachers, students, and parents
- Student and teacher management
- Class management
- Attendance tracking
- Assignments and submissions
- Grades and results
- Fee management
- Timetables
- Announcements and school events
- Messages between users

> Feature availability depends on the current implementation and configuration of each module.

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- React Hook Form and Zod
- Zustand
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- dotenv for environment configuration
- CORS and express-validator

## Project Structure

```text
School-Management-System/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Request handlers and business logic
│   │   ├── middleware/      # Authentication and authorization
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # REST API routes
│   │   └── server.js        # Backend entry point
│   ├── package.json
│   └── .env                 # Create locally; do not commit
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/             # API service modules
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Application pages
│   │   ├── config/
│   │   ├── lib/
│   │   └── main.jsx
│   ├── package.json
│   └── .env.local           # Create locally; do not commit
├── API_INTEGRATION_GUIDE.md
└── README.md
```

## Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/) (a current LTS version is recommended)
- npm (included with Node.js)
- [MongoDB](https://www.mongodb.com/) locally or a MongoDB Atlas database

## Getting Started

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd School-Management-System
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your repository URL.

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/school_management
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

If you use MongoDB Atlas, replace `MONGODB_URI` with your own Atlas connection string. Do not publish database credentials or JWT secrets.

Start the backend:

```bash
npm run dev
```

The backend is expected to run at `http://localhost:5000`, subject to the server configuration.

### 3. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open the local URL printed by Vite in your terminal. The default Vite development URL is usually `http://localhost:5173`.

## Available Scripts

### Backend (`backend/`)

| Command | Description |
| --- | --- |
| `npm install` | Install backend dependencies |
| `npm run dev` | Start the server with Nodemon |
| `npm start` | Start the server |

### Frontend (`frontend/`)

| Command | Description |
| --- | --- |
| `npm install` | Install frontend dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## API

The backend exposes REST API routes under `/api`. The project includes route modules for authentication, students, teachers, classes, assignments, attendance, grades, announcements, messages, fees, timetables, events, and parents.

For the endpoint list and integration notes, see [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md).

## Security Notes

- Never commit `.env`, `.env.local`, database credentials, API keys, or JWT secrets.
- Keep `node_modules/` out of Git; dependencies can be restored with `npm install`.
- Use a strong, unique JWT secret in each environment.
- Validate authorization on the server for every protected operation.
- Before publishing, review the repository history and documentation for accidentally included credentials. Rotate any credentials that may already have been exposed.

## Troubleshooting

### MongoDB connection fails
- Confirm MongoDB is running or your Atlas cluster is available.
- Check the `MONGODB_URI` value in `backend/.env`.
- For Atlas, confirm the database user's permissions and network access settings.

### Frontend cannot reach the API
- Confirm the backend is running on port `5000` or update `VITE_API_URL`.
- Check that `FRONTEND_URL` matches the frontend development origin.
- Review browser developer tools and backend logs for errors.

### Dependencies or scripts fail
- Run `npm install` separately inside `backend/` and `frontend/`.
- Use a compatible Node.js LTS version.
- Review the terminal output for the specific package or configuration error.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Open a pull request describing the changes.

## License

No license has been specified yet. Add a `LICENSE` file before distributing or reusing this project publicly.
