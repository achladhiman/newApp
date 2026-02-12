# MEAN Stack CRUD Application

This project is a simple CRUD application built with Node.js, Express, MongoDB, MySQL, and Angular.

## Prerequisites

- Node.js
- MongoDB
- MySQL

## Installation

### Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mean_test
   MYSQL_DB=mean_test
   MYSQL_USER=root
   MYSQL_PASSWORD=password
   MYSQL_HOST=localhost
   JWT_SECRET=mysecretkey
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Angular development server:
   ```bash
   npm start
   ```

## Features

- **Product CRUD**: Managed with MongoDB.
- **User Authentication**: User registration and login managed with MySQL (Sequelize).
- **Order Management**: Order entity with associations in MySQL.
- **Third-party API Integration**: Displays current weather data from Open-Meteo on the dashboard.
