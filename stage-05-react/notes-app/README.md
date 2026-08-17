# Sprint 1 — Project Setup

## Overview

This sprint establishes the foundation for the React Notes App.

The project was created using React, TypeScript, Vite, and Tailwind CSS.

The goal was to understand the basic React application structure and create the first components before implementing the Notes App features.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS

## Project Structure

```text
src/
├── components/
│   └── Header.tsx
├── App.tsx
├── main.tsx
└── index.css
```

## What Was Implemented

### App Component

`App.tsx` is the root React component.

It provides the main application layout and composes the `Header` component with the main content.

### Header Component

`Header.tsx` is a separate functional component responsible for displaying the application header.

### Main Layout

The application contains:

* Header
* Main content area
* Notes section placeholder

Tailwind CSS utility classes are used for the initial styling.

## React Concepts Practiced

### JSX

Used JSX to describe the UI structure inside React components.

### Components

Created functional React components and separated the header from the main application component.

### Component Composition

`App` composes `Header` as a child component.

```text
App
└── Header
```

## Result

The project now has a clean React + TypeScript + Tailwind foundation ready for the next sprint.

## Next Sprint

Build the Notes UI using components, props, lists, and keys.
