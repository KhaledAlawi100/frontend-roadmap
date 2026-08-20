# Sprint 1 — Project Setup

## Overview

In this sprint, I created the foundation of the E-Commerce frontend application.

The goal was to establish a clean React architecture and configure the main tools that will be used throughout the project.

## Technologies

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Vite Environment Variables

## Project Structure

```text
src/
├── components/
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductsPage.tsx
│   ├── CartPage.tsx
│   └── AboutPage.tsx
├── layouts/
│   └── MainLayout.tsx
├── hooks/
├── services/
│   └── api.ts
├── types/
├── App.tsx
├── main.tsx
└── index.css
```

## What Was Implemented

### Project Setup

* Created the React + TypeScript project using Vite.
* Configured Tailwind CSS.
* Installed React Router and Axios.
* Removed the default Vite starter content.

### Application Layout

Created a reusable `MainLayout` containing:

* Header
* Main content area
* Footer

The main content is rendered using React Router's `Outlet`.

```text
MainLayout
├── Header
├── Outlet
└── Footer
```

### Navigation

Implemented application navigation using `NavLink`.

Current routes:

```text
/
├── /products
├── /cart
└── /about
```

Navigation is handled by React Router without full-page browser reloads.

### API Configuration

Created a centralized Axios instance:

```text
React
  ↓
Services
  ↓
Axios
  ↓
Fake Store API
```

The API base URL is configured through a Vite environment variable.

```env
VITE_API_URL=https://fakestoreapi.com
```

An `.env.example` file is also provided as a configuration template.

## Concepts Practiced

* React component structure
* JSX
* Component composition
* React Router
* `BrowserRouter`
* `Routes`
* `Route`
* `NavLink`
* Nested/layout routes
* `Outlet`
* Tailwind CSS
* Axios instances
* Environment variables
* Professional frontend folder organization

## Sprint Result

The project now has a working frontend foundation with:

```text
React + TypeScript
       ↓
Tailwind CSS
       ↓
React Router
       ↓
MainLayout
       ↓
Pages + Components
       ↓
Axios
       ↓
Environment Configuration
```

No product API functionality has been implemented yet.

That will be introduced in the next sprint.

## Next Sprint

**Sprint 2 — Routes + Layout**

Focus:

* Refine application routing
* Product details route
* URL parameters
* 404 route
* Nested routes
* Route structure

# Sprint 2 — Routes + Layout

## Goal

Build the application's routing system using React Router.

The goal of this sprint is to understand how React applications manage multiple pages while keeping a shared layout.

---

## Routes

The application currently supports:

- `/` — Home
- `/products` — Products
- `/products/:id` — Product Details
- `/cart` — Shopping Cart
- `*` — 404 Not Found

---

## Architecture

```text
BrowserRouter
      │
      ▼
    Routes
      │
      ▼
 MainLayout
      │
 ├── Header
 │
 ├── Outlet
 │     │
 │     ├── HomePage
 │     ├── ProductsPage
 │     ├── ProductDetailsPage
 │     ├── CartPage
 │     └── NotFoundPage
 │
 └── Footer