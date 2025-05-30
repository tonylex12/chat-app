# Chat Application

A real-time chat application built with a modern tech stack featuring user authentication and messaging capabilities.

## Project Structure

The project is divided into two main parts:

- `frontend/`: Contains the React frontend application
- `backend/`: Contains the Node.js/Express backend server

## Features

- User authentication (signup/login)
- Real-time messaging
- User profile management
- Protected routes

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for database)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd chat-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Environment Setup

Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-secret-key
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## Available Scripts

### Backend

- `npm run dev`: Start the development server with hot-reload
- `npm start`: Start the production server
- `npm test`: Run tests

### Frontend

- `npm start`: Start the development server
- `npm run build`: Build the production version
- `npm test`: Run frontend tests

## Technologies Used

- Frontend: React, Redux, Material-UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Real-time: Socket.io (if implemented)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details