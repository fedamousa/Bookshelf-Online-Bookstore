![header](https://github.com/user-attachments/assets/fae3a7cd-4590-446b-8185-a5270579a5f1)
# Bookshelf - Online Bookstore

Bookshelf is an online platform designed to sell books in various formats, including ebooks, audiobooks, and traditional paper books. The application provides an intuitive user interface, allowing customers to browse, search, and purchase books. It also features user accounts, a shopping cart, and order management functionalities.

## Demo Video
Click the image to watch the demo of Bookshelf - Online Bookstore:


## Demo Video
Watch the demo of Bookshelf - Online Bookstore:

<a href="https://drive.google.com/file/d/1oMeMb31LonzyVlgIin0LNcweBg7azK1K/view?usp=sharing">
    <img src="https://github.com/user-attachments/assets/1889773a-4eea-4ee0-89dd-e5233ffb379b" width="400" />
</a>

## Table of Contents
- [Features](#features)
- [Admin Management](#admin-management)
- [Technologies](#technologies)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Profile and Account Management**: Users can create accounts, log in, and manage personal details, including name, address, and order history.
- **Book Browsing**: Search for books by title and filter them by price range (e.g., minimum price to maximum price).
- **Product Details**: Each book has a detailed page where users can view information such as the title, author, price, available formats, and category.
- **Wishlist**: Add and view favorite books.
- **Shopping Cart**: Add/remove books to the cart, adjust quantities, and proceed to checkout.
- **Order Management**: Users can view order history, and track the status of orders (e.g., completed, pending, shipped, or canceled).
- **Admin Dashboard**: Manage books, orders, and users.

## Admin Management
- **Product Management**: Admins can add, update, and delete books from the store, including managing details like title, author, price, stock quantity, category, and available formats (e.g., paperback, hardcover, ebook, audiobook).
- **User Management**: Admins can:
  - List all users in the system.
  - View user information, including their details and order history.
  - Delete a user from the system.
- **Order Management**: Admins can view and manage all orders in the system. They can update the status of each order (e.g., pending, shipped, completed, or canceled) to keep users informed.

## Technologies
- **Backend**: 
  - C# / .NET 8
  - Entity Framework Core
  - PostgreSQL (managed by Supabase for database operations)
  - JWT for Authentication
  - Supabase (used to manage the PostgreSQL database, authenticate users, and handle real-time data operations)
  - Swagger (for API documentation)
  - Render (for cloud hosting and deployment)
- **Frontend**:
  - React.js
  - MUI (Material UI)
  - React Router
  - Axios for API calls
  - Render (for cloud hosting and deployment)

## Usage

- **Browse Books**: Visit the books page to view books. Use the search form to find books by title or filter books by price.
- **Create an Account**: Register a new user account or sign in to an existing one.
- **Add Books to Cart**: Use the "Add to Cart" button on book pages to add books to your shopping cart.
- **Checkout**: Go to the cart page and complete the checkout process.
- **Manage Orders**: After purchasing, view your order status in your profile section.


## API Endpoints

The Bookshelf project provides a REST API that can be used to manage books, users, orders, and more. Below is an overview of key endpoints:

### Books
- **GET** `/api/books`: Retrieve a list of all books with optional pagination and sorting.
  - **Query Parameters**:
    - `offset` (optional): The starting point for the result set. Default is `0`.
    - `limit` (optional): The number of books to retrieve. Default is `10`.
- **GET** `/api/books/{id}`: Retrieve details of a specific book by its ID.
- **POST** `/api/books`: Create a new book (admin only).
- **PUT** `/api/books/{id}`: Update a book's details (admin only).
- **DELETE** `/api/books/{id}`: Delete a book (admin only).

### Users
- **POST** `/api/users/signUp`: Register a new user.
- **POST** `/api/users/signIn`: Log in to an existing user account and get a JWT token.
- **GET** `/api/users/{id}`: Retrieve user details.
- **GET** `/api/users/auth`: Authenticate a user using their credentials (passed via headers or query parameters) and return a JWT token for authorization.
 - Example: `/api/users/auth?email=user@example.com&password=password123`

### Orders
- **GET** `/api/orders/user/{id}`: Retrieve a specific order by its ID.
- **POST** `/api/orders`: Create a new order (from the cart).
- **PUT** `/api/orders/{id}`: Update an order (e.g., change status, admin only).


## Deployment

The Bookshelf project is deployed to the following URLs:

- **Backend**: [https://sda-3-online-backend-teamwork-2-be3r.onrender.com/](https://sda-3-online-backend-teamwork-2-be3r.onrender.com/)
- **Frontend**: [https://sda-3-online-fe-repo-szn0.onrender.com](https://sda-3-online-fe-repo-szn0.onrender.com)

You can access the live version of the bookstore through these links.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License.



