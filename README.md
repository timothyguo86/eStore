# eStore Project

A full-stack e-commerce application built with Angular and Node.js/Express, featuring a modern user interface and robust
backend functionality.

## Project Structure

This repository contains two main projects:

- `eStore-angular/` - Frontend application built with Angular
- `eStore-server/` - Backend API server built with Node.js and Express

## Technologies Used

### Frontend (eStore-angular)

- Angular 19.1.0
- TypeScript 5.7.2
- Bootstrap 5.3.3
- Font Awesome Icons
- RxJS 7.8.0
- Angular Router
- Angular Forms

### Backend (eStore-server)

- Node.js
- Express 4.21.2
- MySQL 3.12.0
- JWT Authentication (jsonwebtoken 9.0.2)
- bcryptjs 3.0.2
- CORS support

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- MySQL Server
- Angular CLI (`npm install -g @angular/cli`)

## Installation

### Frontend Setup

```bash
# Navigate to frontend directory
cd eStore-angular

# Install dependencies
npm install

# Start development server
npm run start
```

### Backend Setup

```bash
# Navigate to backend directory
cd eStore-server

# Install dependencies
npm install

# Create .env file and configure environment variables
cp .env.example .env

# Start development server
nodemon index.js
```

## Environment Configuration

### Frontend Environment Variables

Create environment files in `eStore-angular/src/environments/`:

```typescript
// environment.ts
export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000'
};
```

### Backend Environment Variables

Create a `.env` file in `eStore-server/`:

```env
PORT=3000
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=estore_db
JWT_SECRET=your_jwt_secret
```

## Database Setup

1. Create a MySQL database named 'estore_db'
2. The application will automatically create required tables on first run
3. Initial data can be imported using provided SQL scripts (if any)

## Features

### Frontend Application

- Responsive user interface using Bootstrap
- User authentication and authorization
- Product catalog with search and filter capabilities
- Shopping cart functionality
- User profile management
- Order history and tracking

### Backend API

- RESTful API endpoints
- JWT-based authentication
- MySQL database integration
- Password encryption
- CORS enabled
- Input validation and sanitization

## API Documentation

### Authentication Endpoints

- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User login
- GET `/api/auth/profile` - Get user profile

### Product Endpoints

- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create new product (Admin only)
- PUT `/api/products/:id` - Update product (Admin only)
- DELETE `/api/products/:id` - Delete product (Admin only)

### Order Endpoints

- GET `/api/orders` - Get user orders
- POST `/api/orders` - Create new order
- GET `/api/orders/:id` - Get order details

## Deployment

### Frontend Deployment

1. Build the production version:

```bash
cd eStore-angular
ng build --configuration production
```

### Backend Deployment

1. Ensure all environment variables are properly set
2. Build and start the server:

```bash
cd eStore-server
npm run build
npm run start
```

