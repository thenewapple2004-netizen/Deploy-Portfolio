# MERN Portfolio Project

This project is a professional portfolio application built using the MERN stack (MongoDB, Express, React, Node.js). It allows users to create, read, update, and delete portfolio items, showcasing their skills and projects.

## Project Structure

```
mern-portfolio
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── portfolioController.js
│   │   ├── models
│   │   │   └── portfolio.js
│   │   ├── routes
│   │   │   └── portfolioRoutes.js
│   │   └── config
│   │       └── db.js
│   ├── package.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   └── Portfolio.js
│   │   ├── pages
│   │   │   └── Home.js
│   │   ├── styles
│   │   │   └── main.css
│   │   └── utils
│   │       └── api.js
│   ├── package.json
│   └── README.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Navigate to the `backend` directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your MongoDB connection in `backend/src/config/db.js`.

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend application:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/portfolio` - Fetch all portfolio items
- `POST /api/portfolio` - Create a new portfolio item
- `PUT /api/portfolio/:id` - Update a portfolio item
- `DELETE /api/portfolio/:id` - Delete a portfolio item

## Contributing

Feel free to fork the repository and submit pull requests for any improvements or features.

## License

This project is licensed under the MIT License.