# MERN Portfolio Backend

## Overview
This is the backend part of the MERN Portfolio project, which serves as an API for managing portfolio items. It is built using Node.js, Express, and MongoDB.

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-portfolio/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Ensure you have MongoDB installed and running.
   - Create a `.env` file in the root of the backend directory and add your MongoDB connection string:
     ```
     MONGODB_URI=<your-mongodb-connection-string>
     ```

4. **Run the application**
   ```bash
   npm start
   ```

## API Endpoints

### Portfolio Routes
- `GET /api/portfolio` - Retrieve all portfolio items
- `POST /api/portfolio` - Create a new portfolio item
- `PUT /api/portfolio/:id` - Update a portfolio item by ID
- `DELETE /api/portfolio/:id` - Delete a portfolio item by ID

## Folder Structure
- `src/app.js` - Entry point of the application
- `src/controllers/portfolioController.js` - Controller for handling portfolio-related requests
- `src/models/portfolio.js` - Mongoose model for portfolio items
- `src/routes/portfolioRoutes.js` - Routes for portfolio-related API endpoints
- `src/config/db.js` - Database connection configuration

## License
This project is licensed under the MIT License.