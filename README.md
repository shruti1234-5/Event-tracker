# Mini Event Tracker

A premium, modern web application to track your personal events with ease.

## Tech Stack

### Backend
- **Node.js & Express**: Scalable and fast RESTful API.
- **MongoDB & Mongoose**: Flexible NoSQL database for event storage.
- **JWT (JSON Web Tokens)**: Secure, stateless authentication.
- **Bcrypt.js**: Industry-standard password hashing.

### Frontend
- **React 19 (Vite)**: Lightning-fast development and optimized production builds.
- **Tailwind CSS v4**: Modern, utility-first styling for a sleek UI.
- **Lucide React**: Clean, consistent iconography.
- **Axios**: Promised-based HTTP client for API communication.
- **React Router**: Seamless client-side navigation.

## Key Features
- **User Authentication**: Secure signup and login flow.
- **Event Management**: Create, view, and delete your events.
- **Smart Filtering**: Toggle between upcoming and past events.
- **Public Sharing**: Generate shareable links for public events.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB connection string (set in `.env`)

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` root and add your `MONGO_URL` , `PORT` and `JWT_SECRET`.
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
