# Fake Store

A modern web application built with React and Next.js, designed for Browse products and viewing their detailed information. 

---

## Features

- **Authentication**: Includes Login and Register pages for user authentication.
- **Protected Routes**: Users must be logged in (via a fake JWT token) to access the product listing and individual product pages.
- **Product Listing**: Browse a dynamic list of products with category filtering.
- **Product Detail Page**: View comprehensive information about individual products.
- **Quantity Selection**: Easily adjust the desired product quantity.

---

## Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/MarekJuricko/Fake_Store.git
    cd your-project-name
    ```

2.  **Install Dependencies**

    ```bash
    npm install
    ```

3.  **Start the Development Server**

    ```bash
    npm run dev
    ```

## Components

-   **AuthGuard**: Manages authentication status and protects routes, ensuring only logged-in users can access certain parts of the application.
-   **Navbar**: Provides site logout functionality.
-   **ProductsList**: Renders the dynamic list of products and handles category filtering.


## Styling

- Uses **Tailwind CSS** for a utility-first approach to styling and theme management.
- Implements **responsive design** for optimal viewing on various devices.


## API

Interacts with a mock API at: [Fake Store API](https://fakestoreapi.com/products).
