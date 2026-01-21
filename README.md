
# CBC Frontend

![Website Preview](public/web.png)

This is the frontend for the CBC project, built with React and Vite.

## Overview

CBC (Customer Buying Center) is a modern e-commerce web application designed to provide a seamless shopping experience. The frontend is built using React and Vite for fast performance and easy development. It connects to a robust backend for user management, product handling, and order processing.

## Tech Stack
- **React**: UI library for building interactive interfaces
- **Vite**: Fast build tool and development server
- **JavaScript (ES6+)**: Main programming language
- **CSS Modules**: For component-level styling
- **Supabase**: Used for authentication and media storage
- **Google OAuth**: Social login integration

## Key Features
- **User Authentication**: Signup, login, forgot password, Google OAuth
- **Product Catalog**: Browse products, view details, quick view, image slider
- **Shopping Cart**: Add/remove products, update quantities, view cart summary
- **Order Management**: Place orders, view order history, shipping details
- **Admin Dashboard**: Manage products, view orders, edit product info, manage users
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Review System**: Users can review products
- **Sliders & Carousels**: Home page and product image sliders
- **Media Uploads**: Admins can upload product images

## Folder Structure
- `src/components/` - Reusable UI components (cards, sliders, header, footer, etc.)
- `src/pages/` - Main pages (Home, About, Contact, Login, Signup, Admin, etc.)
- `src/pages/admin/` - Admin-specific pages (dashboard, product management, orders, users)
- `src/pages/home/` - User shopping experience (cart, orders, product overview, shipping)
- `src/utils/` - Utility functions (cart logic, media upload, quick view service)
- `public/` - Static assets (images, favicon, etc.)

## How to Use
1. Visit the [Live Demo](https://cbc-frontend-sept.vercel.app/)
2. Sign up or log in (Google OAuth available)
3. Browse products, add to cart, and place orders
4. Admins can log in to manage products and view orders

## Backend Integration
All data (products, users, orders) is managed via the backend API. For backend setup, see:
[CBC Backend Repository](https://github.com/geethsenaviratne/cbc-backend.git)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.

## Live Demo

[View the deployed frontend](https://cbc-frontend-sept.vercel.app/)

## Backend Repository

[Go to CBC Backend Repository](https://github.com/geethsenaviratne/cbc-backend.git)

## Getting Started

1. Clone this repository
2. Install dependencies:
	```bash
	npm install
	```
3. Start the development server:
	```bash
	npm run dev
	```

## Project Structure
- `src/` - Main source code
- `public/` - Static assets (including `web.png`)

## Features
- Modern React UI
- Integration with backend API
- Responsive design

---

For backend setup and API documentation, visit the [backend repository](https://github.com/geethsenaviratne/cbc-backend.git).
