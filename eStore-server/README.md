# eStore Server

## Description

This is the backend server for the eStore application, built with Express.js and TypeScript. The server provides RESTful
API endpoints to support the eStore frontend application.

## Technologies Used

- Node.js
- Express.js (v4.21.2)
- TypeScript (v5.7.2)
- MySQL2 (v3.12.0)
- JSON Web Token (v9.0.2)
- bcryptjs (v3.0.2)
- CORS (v2.8.5)

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm package manager
- MySQL database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/timothyguo86/eStore.git
cd eStore-server
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=estore_db
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Development mode

```bash
nodemon index.js
```

### Production mode

```bash
npm run build
npm start
```

## API Documentation

### Authentication Endpoints

- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Product Endpoints

- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product (Protected)
- PUT `/api/products/:id` - Update product (Protected)
- DELETE `/api/products/:id` - Delete product (Protected)

## Security

- JWT authentication
- Password hashing using bcryptjs
- CORS enabled
- Input validation and sanitization

## Database

The application uses MySQL as the database. Make sure to:

1. Create a MySQL database
2. Configure the connection in the environment variables
3. Run migrations (if applicable)
